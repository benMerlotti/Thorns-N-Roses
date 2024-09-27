export const addCartItem = (cartItem) => {
    return fetch("http://localhost:8088/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cartItem)
    }).then((res) => res.json());
  };



  export const getAllCarts = () => {
    return fetch("http://localhost:8088/carts?_expand=customer&_expand=retailer&_expand=flower").then(
      (res) => res.json()
    );
  };

  export const getCartsByCustomerId = (customerId) => {
    return fetch(`http://localhost:8088/carts?customerId=${customerId}&_expand=retailer&_expand=flower`).then(
      (res) => res.json()
    )
    
  }
  //still USE QUERY PARAMETER FOR HTIS BECAUSE YOU ARE FILTERING OR SERACHING FOR MULTIPLE RESOURCES BASSED ON CONDITION 
  // USE PATH VARIABLE TO ACCESS SPECIFIC RESORUCE LIKE A SINGLE CART. LIKE GET SPECIFIC CART BY ITS ID. RETRIEVE SPECIFIC RESOURCE. 

  // [
  //   {"id": 1, "customerId": 1, "retailerId": 2, "flowerId": 5, "retailer": {"id": 2, "businessName": "Floral Haven", "markupPercentage": 1.15}, "flower": {"id": 5, "color": "blue", "species": "Lily"}},
  //   {"id": 2, "customerId": 1, "retailerId": 3, "flowerId": 7, "retailer": {"id": 3, "businessName": "Bloom & Blossom", "markupPercentage": 1.15}, "flower": {"id": 7, "color": "pink", "species": "Rose"}},
  //   {"id": 3, "customerId": 1, "retailerId": 1, "flowerId": 10, "retailer": {"id": 1, "businessName": "Petal Boutique", "markupPercentage": 1.15}, "flower": {"id": 10, "color": "white", "species": "Rose"}}
  // ]
  





  //   { "id": 2, "customerId": 2, "retailerId": 1, "flowerId": 2, "customer": { "id": 2, "name": "Bob", "businessName": "Floral Dreams", "email": "bob@example.com", "password": "hashedpassword" }, "retailer": { "id": 1, "businessName": "Petal Boutique", "address": "1 Bloom St.", "distributorId": 1, "markupPercentage": 1.15 }, "flower": { "id": 2, "color": "yellow", "species": "Orchid" } }
  // ]

  // "carts": [
    // {
    //   "id": 1,
    //   "customerId": 1,
    //   "retailerId": 5,
    //   "flowerId": 10
    // },
    // {
    //   "id": 2,
    //   "customerId": 2,
    //   "retailerId": 1,
    //   "flowerId": 2
    // },