import { useEffect, useState } from "react";
import { getAllRetailers } from "../../services/reatailerServices";
import { Retail } from "./Retailer";

export const RetailerList = () => {
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
          return <Retail retailer={retailerObj} key={retailerObj.id} />;
        })}
      </article>
    </div>
  );
};
