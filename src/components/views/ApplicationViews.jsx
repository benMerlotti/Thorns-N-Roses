import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../nav/navbar";
import { Welcome } from "../welcome/Welcome";
import { NurseriesList } from "../nurseries/NurseriesList";
import { DistributorsList } from "../distributors/DistributorsList";
import { RetailerList } from "../retailers/RetailerList";
import { useEffect, useState } from "react";
import { MyCart } from "../shoppingCart/MyCart";
import { getShoppingCart } from "../../services/cartServices";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [cart, setCart] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [totalCartQuantity, setTotalCartQuantity] = useState([]);

  useEffect(() => {
    const localRosesThornsUser = localStorage.getItem("rosesThorns_user");
    const RosesThornsUserObject = JSON.parse(localRosesThornsUser);

    setCurrentUser(RosesThornsUserObject);
  }, []);

  useEffect(() => {
    getShoppingCart().then((cartArray) => {
      setCart(cartArray);
    });
  }, []);

  useEffect(() => {
    const currentUserCart = cart.filter(
      (crt) => crt.customerId === currentUser.id
    );

    setUserCart(currentUserCart);
  }, [cart, currentUser.id]);

  useEffect(() => {
    setTotalCartQuantity(userCart.length);
  }, [userCart.length]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar totalCartQuantity={totalCartQuantity} />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="/nurseries" element={<NurseriesList />} />
        <Route path="/distributors" element={<DistributorsList />} />
        <Route
          path="/retailers"
          element={<RetailerList currentUser={currentUser} />}
        />
        <Route
          path="/my-cart"
          element={
            <MyCart currentUser={currentUser} cart={cart} userCart={userCart} />
          }
        />
      </Route>
    </Routes>
  );
};
