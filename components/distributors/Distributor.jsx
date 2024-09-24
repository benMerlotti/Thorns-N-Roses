import { useEffect, useState } from "react";
import { getAllDistributorsNurseries } from "../../services/distributorServices";
import { getNurseryFlowers } from "../nurseries/NurseriesService";
import "./Distributor.css";
import { getAllRetailers } from "../../services/reatailerServices";

export const Distributor = ({ distributor }) => {
  const [distributorNurseries, setDistributorNurseries] = useState([]);
  const [nurseries, setNurseries] = useState([]);
  const [nurseryFlowers, setNurseryFlowers] = useState([]);
  const [distributorFlowers, setDistributorFlowers] = useState([]);
  const [allRetailers, setAllRetailers] = useState([]);
  const [distRetail, setDistRetail] = useState([]);

  useEffect(() => {
    getAllDistributorsNurseries().then((data) => {
      setDistributorNurseries(data);
    });
  }, []);

  useEffect(() => {
    const filteredNurseries = distributorNurseries.filter(
      (nurse) => nurse.distributorId === distributor.id
    );
    setNurseries(filteredNurseries);
  }, [distributor.id, distributorNurseries]);

  useEffect(() => {
    getNurseryFlowers().then((data) => {
      setNurseryFlowers(data);
    });
  }, []);

  useEffect(() => {
    const nurseryIds = nurseries.map((nursery) => nursery.nurseryId);
    const matchFlowers = nurseryFlowers.filter((flowers) =>
      nurseryIds.includes(flowers.nurseryId)
    );
    setDistributorFlowers(matchFlowers);
  }, [nurseries, nurseryFlowers]);

  useEffect(() => {
    getAllRetailers().then((data) => {
      setAllRetailers(data);
    });
  }, []);

  useEffect(() => {
    const matchRetailers = allRetailers.filter(
      (retailer) => retailer.distributorId === distributor.id
    );

    setDistRetail(matchRetailers);
  }, [allRetailers, distributor.id]);

  return (
    <section className="distributor">
      <header className="distributor-name">{distributor.businessName}</header>
      <div className="distributor-flowers">
        {distributorFlowers.map((df) => {
          const markupPrice = df.price * distributor.flowerPriceMarkup;
          const rounded = markupPrice.toFixed(2);
          return (
            <div className="distributor-flower" key={df.flowerId}>
              <div>Species: {df.flower?.species}</div>
              <div>Color: {df.flower?.color}</div>
              <div>Price: ${rounded}</div>
            </div>
          );
        })}
        <div className="retailers">
          <h3>Retailers:</h3>
          <ul className="retailer-list">
            {distRetail.map((dr) => {
              return (
                <li className="retailer-list-item" key={dr.id}>
                  {dr.businessName}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
