import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../services/userService"; // Adjust the path as needed
import { createUser } from "../../services/userService"; // Assuming the service is in a file called userService.js


export const Register = (props) => {
    const [user, setUser] = useState({
      email: "",
      name: "",
      businessName: "",
      password: "",
    })
    let navigate = useNavigate()
  
    const registerNewUser = () => {
      const newUser = { ...user }
      createUser(newUser).then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "rosesThorns_user",
            JSON.stringify({
              id: createdUser.id,
              name: createdUser.name,
              businessName: createdUser.businessName,
            })
          )
          navigate("/")
        }
      })
    }
  
    const handleRegister = (e) => {
      e.preventDefault()
      getUserByEmail(user.email).then((response) => {
        if (response.length > 0) {
          window.alert("Account with that email address already exists")
        } else {
          registerNewUser()
        }
      })
    }
  
    const updateUser = (evt) => {
      const copy = { ...user }
      copy[evt.target.id] = evt.target.value
      setUser(copy)
    }
  
    return (
      <main className="auth-container">
        <form className="auth-form" onSubmit={handleRegister}>
          <h1 className="header">Roses and Thorns</h1>
          <h2>Please Register</h2>
          <fieldset>
            <input
              onChange={updateUser}
              type="text"
              id="name"
              placeholder="Your name"
              required
            />
          </fieldset>
          <fieldset>
            <input
              onChange={updateUser}
              type="text"
              id="businessName"
              placeholder="Your business name"
              required
            />
          </fieldset>
          <fieldset>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              placeholder="Email address"
              required
            />
          </fieldset>
          <fieldset>
            <input
              onChange={updateUser}
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </fieldset>
          <button type="submit">Register</button>
        </form>
      </main>
    )
  }
  