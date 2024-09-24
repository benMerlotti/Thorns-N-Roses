

export const getUserByEmail = async (email) => {
    const response = await fetch(`http://localhost:8088/customers?email=${email}`);
    const users = await response.json();
    return users; // This should return an array of users that match the email
  };

  

  export const createUser = (customer) => {
    return fetch("http://localhost:8088/customers", {  // Assuming you are using the `customers` resource
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),  // Convert the customer object to JSON
    }).then((res) => res.json())  // Parse the response as JSON
  }
  