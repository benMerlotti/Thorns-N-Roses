import { useEffect, useState } from "react";
import { getAllFlowers } from "../../services/flowerServices";
import "./Nursery.css";
import { getAllDistributorsNurseries } from "../../services/distributorServices";

export const Nursery = ({ nursery }) => {
  const [flowers, setFlowers] = useState([]);
  const [nurseryFlowers, setNurseryFlowers] = useState([]);
  const [distributorNurseries, setDistributorNurseries] = useState([]);
  const [distributors, setDistributors] = useState([]);

  useEffect(() => {
    getAllFlowers().then((flowerData) => {
      setFlowers(flowerData);
    });
  }, []);

  useEffect(() => {
    const filteredFlowers = flowers.filter(
      (flower) => flower.nurseryId === nursery.id
    );
    setNurseryFlowers(filteredFlowers);
  }, [flowers, nursery.id]);

  useEffect(() => {
    getAllDistributorsNurseries().then((data) => {
      setDistributorNurseries(data);
    });
  }, []);

  useEffect(() => {
    const filteredDistributors = distributorNurseries.filter(
      (dist) => dist.nurseryId === nursery.id
    );
    setDistributors(filteredDistributors);
  }, [distributorNurseries, nursery.id]);

  return (
    <section className="nursery">
      <header className="nursery-name">{nursery.businessName}</header>
      <div className="nursery-flowers">
        {nurseryFlowers.map((nurseryFlower) => {
          return (
            <div className="nursery-flower" key={nurseryFlower.flowerId}>
              <div>Species: {nurseryFlower.flower?.species}</div>
              <div>Color: {nurseryFlower.flower?.color}</div>
              <div>Price: ${nurseryFlower.price}</div>
            </div>
          );
        })}
        <div className="distributors">
          <h3>Distributors:</h3>
          <ul className="distributor-list">
            {distributors.map((dist) => {
              return (
                <li className="distributor-list-item" key={dist.distributorId}>
                  {dist.distributor?.businessName}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
