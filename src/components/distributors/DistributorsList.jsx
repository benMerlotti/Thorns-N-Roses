import { useEffect, useState } from "react";
import { Distributor } from "./Distributor";
import { getAllDistributors } from "../../services/distributorServices";

export const DistributorsList = () => {
  const [distributors, setDistributors] = useState([]);

  useEffect(() => {
    getAllDistributors().then((distributorArray) => {
      setDistributors(distributorArray);
    });
  }, []);

  return (
    <div>
      <h2>Distributors</h2>
      <article>
        {distributors.map((distributorObj) => {
          return (
            <Distributor distributor={distributorObj} key={distributorObj.id} />
          );
        })}
      </article>
    </div>
  );
};
