export const addToShoppingCart = (cart) => {
  return fetch("http://localhost:8088/shoppingCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });
};

export const getShoppingCart = () => {
  return fetch(
    "http://localhost:8088/shoppingCart?_expand=flower&_expand=retailer"
  ).then((res) => res.json());
};
