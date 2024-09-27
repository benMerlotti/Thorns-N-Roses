import { useEffect, useState } from "react";
import "./Retailer.css";
import { getNurseryFlowers } from "../nurseries/NurseriesService";
import {
  getAllDistributorsNurseries,
  getAllDistributors,
} from "../../services/distributorServices";

import {Link} from "react-router-dom"
import {addCartItem} from "../../services/retailerServices";
import { getCartsByCustomerId } from "../../services/cartServices";


export const Retail = ({ retailer, passFunction }) => {
  const [distributorNurseries, setDistributorNurseries] = useState([]);
  const [retailNurseries, setRetailNurseries] = useState([]);
  const [nurseryFlowers, setNurseryFlowers] = useState([]);
  const [retailFlowers, setRetailFlowers] = useState([]);
  const [allDistributors, setAllDistributors] = useState([]);
  const [retailDist, setRetailDist] = useState([]);
  const [cart, setCart] = useState([]);



  useEffect(() => {
    getAllDistributorsNurseries().then((nurseryArray) => {
      setDistributorNurseries(nurseryArray);
    });
  }, []);
   // [ { "distributorId": 1,etches the data from distributorNurseries and includes related distributor and nursery objects
   // BASICALLY DISTRIBUTOR 1 SOURCES FLOWERS FROM NURSERY 1(but it can source from other nurseries also)
   //      "nurseryId": 1,
    //     "distributor": { "id": 1, "businessName": "Bloom Logistics", "flowerPriceMarkup": 1.10 },
    //     "nursery": { "id": 1, "businessName": "Green Thumb Gardens" }
    //   },{

  useEffect(() => {
    getNurseryFlowers().then((data) => {
      setNurseryFlowers(data);
    });
  }, []);
  //nurseryFlowers
  // [{ "nurseryId": 1,"flowerId": 10, "price": 4.50,
  //     "flower": {"id": 10,"color": "pink", "species": "Rose" }},


  useEffect(() => {
    const matchNurseries = distributorNurseries.filter(
      (nursery) => nursery.distributorId === retailer.distributorId
    );
    setRetailNurseries(matchNurseries);
  }, [distributorNurseries, retailer.distributorId]);
  // [  { "distributorId": 1,"nurseryId": 1,
  //     "distributor": {"id": 1, "businessName": "Bloom Logistics", "flowerPriceMarkup": 1.10},
  //     "nursery": { "id": 1, "businessName": "Green Thumb Gardens" }}, {
    // filters distributorNurseries based on the distributorId from the retailer prop.
    //  It finds nurseries supplied by the distributor associated with the
    //   retailer and stores the result in retailNurseries.
    //THIS IS A RETAILER FOR REFERENCE:   {"id": 1, "businessName": "Petal Boutique", "address": "1 Bloom St.", "distributorId": 1, "markupPercentage": 1.15},


  useEffect(() => {
    getAllDistributors().then((distArray) => {
      setAllDistributors(distArray);
    });
  }, []);
  // [{ "id": 1, "businessName": "Bloom Logistics",  "flowerPriceMarkup": 1.10 }, {
 

  useEffect(() => {
    const matchRetailDistributors = allDistributors.filter(
      (dist) => dist.id === retailer.distributorId
    );
    setRetailDist(matchRetailDistributors);
  }, [allDistributors, retailer.distributorId]);
  // find the distributor that matches the distributor associated with the current retailer FIND DISTRIBUTOR THE RETAILER IS ASSOC WITH 
  // [{ "id": 1,"businessName": "Bloom Logistics","flowerPriceMarkup": 1.10 } ]
  //his filters the allDistributors array by matching the distributor ID of
  // the retailer prop, and sets the result in retailDist.

  useEffect(() => {
    const nurseryIds = retailNurseries.map((nursery) => nursery.nurseryId);
    const matchNurseryIds = nurseryFlowers.filter((flowers) =>
      nurseryIds.includes(flowers.nurseryId)
    );
    setRetailFlowers(matchNurseryIds);
  }, [nurseryFlowers, retailNurseries]);
  // will ONLY INCLUDE FLOWERS THAT ARE GROWN IN NURSERIES ASSOCIATED WITH THE RETAILER 
  // extracts the nurseryId values from retailNurseries and checks
  //  if they are present in the nurseryFlowers array. It then stores 
  //  the matched flower data in retailFlowers.
  //  [ { "nurseryId": 1,  "flowerId": 10,  "price": 4.50,
  //     "flower": { "id": 10, "color": "pink",  "species": "Rose"
  //     } },{

  const user = JSON.parse(localStorage.getItem("rosesThorns_user"));
  const customerId = user?.id; // This retrieves the customerId if the user is logged in
  //get customer

  useEffect(() => {
    getCartsByCustomerId().then((data) => {
      setCart(data); 
    });
    console.log("what is value of cart after gettingi t from getCartsByCustomerId", cart);
    }, [customerId])


  const addToCart = async (rf, rounded) => {
    const cartItem = {
      customerId: customerId,
      retailerId: retailer.id,
      flowerId: rf.flower.id,
      price: rounded
    }
   let addedCartItem = await addCartItem(cartItem);
   setCart([...cart, addedCartItem]);
   passFunction(cart.length + 1);  // Manually adding 1 to the old cart length because the state update hasn't happened yet.
   
   console.log("within addToCart what is value of the cart after adding latest item", cart);

  }

  //       <Link to={`/myCart/${rf.flower.id}`}>
  // <button onClick={() => console.log("purchase clicked")} > Purchase </button>
  // </Link>

  return (
    <section className="retailer">
      <header className="retailer-name">{retailer.businessName}</header>
      <div className="retailer-flowers">
        {retailFlowers.map((rf) => {
          const markupPrice = rf.price * retailer.markupPercentage;
          const rounded = markupPrice.toFixed(2);
          return (
            <div className="retailer-flower" key={rf.flowerId}>
              <div>Species: {rf.flower?.species}</div>
              <div>Color: {rf.flower?.color}</div>
              <div>Price: ${rounded}</div>
              <section>
                <button onClick={() => addToCart(rf, rounded)} > Purchase </button>
              </section>
            </div>
          );
        })}
        <div className="distributor">
          <h3>Distributors</h3>
          <ul className="distributor-list">
            {retailDist.map((rd) => {
              return (
                <li className="distributor-list-item" key={rd.id}>
                  {rd.businessName}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="nursery">
          <h3>Nurseries</h3>
          <ul className="nursery-list">
            {retailNurseries.map((rn) => {
              return (
                <li className="nursery-list-item" key={rn.nursery?.id || rn.id}>
                  {rn.nursery?.businessName}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
        <li>
      <Link
        to="/myCart">
        My Cart {cart.length}
      </Link>
    </li>
        </div>
      </div>
    </section>
  );
};
