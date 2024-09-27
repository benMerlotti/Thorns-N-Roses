import { useEffect, useState } from "react";
import "./Retailer.css";
import { getNurseryFlowers } from "../nurseries/NurseriesService";
import {
  getAllDistributorsNurseries,
  getAllDistributors,
} from "../../services/distributorServices";
import { addToShoppingCart } from "../../services/cartServices";

export const Retail = ({ retailer, currentUser }) => {
  const [distributorNurseries, setDistributorNurseries] = useState([]);
  const [retailNurseries, setRetailNurseries] = useState([]);
  const [nurseryFlowers, setNurseryFlowers] = useState([]);
  const [retailFlowers, setRetailFlowers] = useState([]);
  const [allDistributors, setAllDistributors] = useState([]);
  const [retailDist, setRetailDist] = useState([]);

  useEffect(() => {
    getAllDistributorsNurseries().then((nurseryArray) => {
      setDistributorNurseries(nurseryArray);
    });
  }, []);

  useEffect(() => {
    getNurseryFlowers().then((data) => {
      setNurseryFlowers(data);
    });
  }, []);

  useEffect(() => {
    const matchNurseries = distributorNurseries.filter(
      (nursery) => nursery.distributorId === retailer.distributorId
    );

    setRetailNurseries(matchNurseries);
  }, [distributorNurseries, retailer.distributorId]);

  useEffect(() => {
    getAllDistributors().then((distArray) => {
      setAllDistributors(distArray);
    });
  }, []);

  useEffect(() => {
    const matchRetailDistributors = allDistributors.filter(
      (dist) => dist.id === retailer.distributorId
    );
    setRetailDist(matchRetailDistributors);
  }, [allDistributors, retailer.distributorId]);

  useEffect(() => {
    const nurseryIds = retailNurseries.map((nursery) => nursery.nurseryId);
    const matchNurseryIds = nurseryFlowers.filter((flowers) =>
      nurseryIds.includes(flowers.nurseryId)
    );
    setRetailFlowers(matchNurseryIds);
  }, [nurseryFlowers, retailNurseries]);

  const handleAddToCart = (retailFlowers) => {
    const markupPrice = retailFlowers.price * retailer.markupPercentage;
    const rounded = Number(markupPrice.toFixed(2));
    const cart = {
      id: "",
      customerId: currentUser.id,
      retailerId: retailer.id,
      flowerId: retailFlowers.flowerId,
      price: rounded,
    };

    addToShoppingCart(cart);
  };

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
              <button
                onClick={() => handleAddToCart(rf)}
                className="retail-btn"
              >
                Add to cart
              </button>
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
                <li className="nursery-list-item" key={rn.id}>
                  {rn.nursery?.businessName}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
