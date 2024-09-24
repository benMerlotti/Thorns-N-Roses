export const getAllRetailers = () => {
  return fetch("http://localhost:8088/retailers?_expand=distributor").then(
    (res) => res.json()
  );
};
