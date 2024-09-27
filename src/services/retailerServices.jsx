export const getAllRetailers = () => {
  return fetch("http://localhost:8088/retailers?_expand=distributor").then(
    (res) => res.json()
  );
};

export const addCartItem = (cartItem) => {
  return fetch("http://localhost:8088/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cartItem)
  }).then((res) => res.json())
};

export const getDistributorByRetailerId = (retailerId) => {
  return fetch(`http://localhost:8088/retailers/${retailerId}?_expand=distributor`).then(
    (res) => res.json()
  );
};