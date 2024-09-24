import { useEffect, useState } from "react";
import { getAllNurseries } from "./NurseriesService";
import { Nursery } from "./Nursery";

export const NurseriesList = () => {
  const [nurseries, setNurseries] = useState([]);

  useEffect(() => {
    getAllNurseries().then((nurseryArray) => {
      setNurseries(nurseryArray);
    });
  }, []);

  return (
    <div>
      <h2>Nurseries</h2>
      <article>
        {nurseries.map((nurseryObj) => {
          return <Nursery nursery={nurseryObj} key={nurseryObj.id} />;
        })}
      </article>
    </div>
  );
};
