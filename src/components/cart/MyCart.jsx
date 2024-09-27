import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { getDistributorByRetailerId } from "../../services/retailerServices";
import { getCartsByCustomerId } from "../../services/cartServices";
import { useEffect, useState } from "react";
import {getDistributorNurseriesByNurseryId} from "../../services/distributorServices"

export const MyCart = () => {
    // const { flowerId } = useParams();  // Grab the postId from the URL
    const [allDistributorNurseries, setAllDistributorNurseries] = useState([]);
    const [customerCarts, setCustomerCarts] = useState([]);
    const [customerRetailers, setCustomerRetailers] = useState([]);
    const [relevantDistributorNurseries, setRelevantDistributorNurseries] = useState([]);
    const [sortedFlowersObject, setSortedFlowersObject] = useState({});

    // const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("rosesThorns_user"));
    const customerId = user?.id; // This retrieves the customerId if the user is logged in

    useEffect(() => {
      getCartsByCustomerId(parseInt(customerId)).then((data) => {
          setCustomerCarts(data);
          console.log("customerCarts: ", data); // Check if data is coming back
      })
    }, []);

    useEffect(() => {
      let obj = sortingFlowers(customerCarts);
      setSortedFlowersObject(obj);
      console.log("sortedFlowersObject: ", obj); // Check the sorted object
    }, [customerCarts]);

  

    // given this input 
    // const customerCarts = [
    //     { id: 1, customerId: 1, retailerId: 1, flowerId: 5, price: 10 },
    //     { id: 2, customerId: 2, retailerId: 2, flowerId: 5, price: 12 },
    //     { id: 3, customerId: 1, retailerId: 1, flowerId: 10, price: 15 },
    //     { id: 4, customerId: 3, retailerId: 3, flowerId: 7, price: 8 }
    //   ];
      
    const sortingFlowers = (customerCarts) => {
        return customerCarts.reduce((acc, item) => {
          // If the flowerId doesn't exist in the accumulator, create an empty array for it
          if (!acc[item.flowerId]) {
            acc[item.flowerId] = [];
          }
          // Push the current item into the array for that flowerId
          //WE INITIALIZE ACC[ITEM.FLOWERID] TO BE AN EMPTY ARRAY AT THE TOP THAT IS WHY WE CAN PUSH THE OBJECT INTO IT 
          // BASED OFF WHAT THE KEY IS WILL AUTOMATICALLY PUSH THE RIGHT VALUE TO IT 
          acc[item.flowerId].push(item);
          return acc;
        }, {});

   // this is our output 
//    {
//     "5": [
//       { id: 1, customerId: 1, retailerId: 1, flowerId: 5, price: 10 },
//       { id: 2, customerId: 2, retailerId: 2, flowerId: 5, price: 12 }
//     ],
//     "10": [
//       { id: 3, customerId: 1, retailerId: 1, flowerId: 10, price: 15 }
//     ],
//     "7": [
//       { id: 4, customerId: 3, retailerId: 3, flowerId: 7, price: 8 }
//     ]}

// NOTE EXTRA STEPS 
// Step 2: Convert the object to an array of arrays (grouped by flowerId)
// const groupedArray = Object.values(groupedFlowers);
// object.values Will ALWAYS RETURN AN ARRAY 
//[[{id: 1, flowerId: 5, price: 10}, {id: 2, flowerId: 5, price: 12}], [{id: 3, flowerId: 10, price: 15}], [{id: 4, flowerId: 7, price: 8}]]


// Step 3 (optional): Flatten the array into a single array of objects
// const flattenedArray = groupedArray.flat();
// [{id: 1, flowerId: 5, price: 10}, {id: 2, flowerId: 5, price: 12}, {id: 3, flowerId: 10, price: 15}, {id: 4, flowerId: 7, price: 8}]

};

const calculatePrice = (sortedFlowersObject) => {
    // Use Object.entries to get both flowerId and the array of objects
    const flowersArrayEntries = Object.entries(sortedFlowersObject);
  
    let arrayWithPrice = flowersArrayEntries.map(([flowerId, eachArray]) => {
      // Use reduce with an accumulator that also holds flowerId temporarily
      let result = eachArray.reduce((acc, indObject) => {
        return {
          flowerId: flowerId,  // Include flowerId in the accumulator
          totalPrice: acc.totalPrice + indObject.price  // Accumulate price
        };
      }, { flowerId: flowerId, totalPrice: 0 });  // Initial accumulator with flowerId
  
      // After reduce is done, return the result along with the original orders
      return {
        flowerId: result.flowerId,  // Record flowerId
        orders: eachArray,  // Include the array of original objects
        totalPrice: result.totalPrice  // Record the total price
      };
    });
  
    return arrayWithPrice;
  };
//   [
//     {
//       flowerId: "5",
//       orders: [
//         { id: 1, customerId: 1, retailerId: 1, flowerId: 5, price: 10 },
//         { id: 2, customerId: 2, retailerId: 2, flowerId: 5, price: 12 }
//       ],
//       totalPrice: 22
//     },
//     {
//       flowerId: "10",
//       orders: [
//         { id: 3, customerId: 1, retailerId: 1, flowerId: 10, price: 15 }
//       ],
//       totalPrice: 15
//     }
//   ]
  

 // Use your calculatePrice function to get the final data
 const processedData = calculatePrice(sortedFlowersObject);

 return (
  <div>
    <table>
      <thead>
        <tr>
          <th>Flower</th>
          <th>Total Price for Flower</th>
        </tr>
      </thead>
      <tbody>
      {processedData.map((item) => (
  <tr key={item.flowerId}>
    <td>{item.orders[0]?.flower?.species}</td>  {/* Get the flower name */}
    <td>{item.totalPrice}</td>  {/* Total price for this flower */}
  </tr>
))}
      </tbody>
    </table>
  </div>
);
};