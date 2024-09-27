import { useEffect, useState } from "react";
import { getShoppingCart } from "../../services/cartServices";
import "./MyCart.css";

export const MyCart = ({ currentUser, cart, userCart }) => {
  const [cartSummary, setCartSummary] = useState([]);

  useEffect(() => {
    const summary = userCart.reduce((flowerSummary, cartItem) => {
      const existingFlower = flowerSummary.find(
        (item) => item.flowerId === cartItem.flowerId
      );
      if (!existingFlower) {
        let obj = {
          price: cartItem.price,
          species: cartItem.flower.species,
          color: cartItem.flower.color,
          quantity: 1,
          flowerId: cartItem.flowerId,
        };
        flowerSummary.push(obj);
      } else {
        existingFlower.quantity++;
        existingFlower.price += cartItem.price;
      }
      return flowerSummary;
    }, []);
    setCartSummary(summary);
  }, [userCart]);

  return (
    <div className="cart-container">
      <ul className="cart-list">
        {cartSummary.map((cart) => {
          const price = cart.price;
          const rounded = Number(price.toFixed(2));
          return (
            <li key={cart.flowerId} className="cart-item">
              <span className="cart-species">{cart.species}</span>
              <span className="cart-color">{`(${cart.color})`}</span>
              <span className="cart-quantity">{cart.quantity}</span>
              <span className="cart-price">{`$${rounded}`}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
