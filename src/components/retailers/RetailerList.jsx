import { useEffect, useState } from "react";
import { getAllRetailers } from "../../services/retailerServices";
import { Retail } from "./Retailer";

export const RetailerList = ({ passFunction }) => {
  const [allRetailers, setAllRetailers] = useState([]);

  useEffect(() => {
    getAllRetailers().then((data) => {
      setAllRetailers(data);
    });
  }, []);

  return (
    <div>
      <h2>Retailers</h2>
      <article>
        {allRetailers.map((retailerObj) => {
           return (
            <Retail 
              retailer={retailerObj} 
              key={retailerObj.id} 
              passFunction={passFunction}  // Pass it down to each Retail component
            />
          );
        })}
      </article>
    </div>
  );
};
