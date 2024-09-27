export const getAllDistributors = () => {
  return fetch("http://localhost:8088/distributors").then((res) => res.json());
};

export const getAllDistributorsNurseries = () => {
  return fetch(
    "http://localhost:8088/distributorNurseries?_expand=distributor&_expand=nursery"
  ).then((res) => res.json());
};

export const getDistributorNurseriesByNurseryId = (distributorId) => {
  return fetch (
    `http://localhost:8088/distributorNurseries?distributorId=${distributorId}&_expand=distributor&_expand=nursery`
  )
}