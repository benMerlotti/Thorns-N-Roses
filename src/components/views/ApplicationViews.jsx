import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../nav/navbar";
import { Welcome } from "../welcome/Welcome";
import { NurseriesList } from "../nurseries/NurseriesList";
import { DistributorsList } from "../distributors/DistributorsList";
import { RetailerList } from "../retailers/RetailerList";
import {MyCart} from "../cart/MyCart";
import { useState } from "react";

export const ApplicationViews = () => {

  const [navBarBoolean, setNavBarBoolean] = useState(false);
  const [cartLengthForNavBar, setCartLengthForNavBar] = useState(0);

  const acceptCartObjectCount = (cartLength) => {
    if(cartLength > 0){
      setNavBarBoolean(true);
      setCartLengthForNavBar(cartLength);
    }

  }




  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
           <NavBar boolean={navBarBoolean} cartLengthForNavBar={cartLengthForNavBar} />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="/nurseries" element={<NurseriesList />} />
        <Route path="/distributors" element={<DistributorsList />} />
        <Route path="/retailers" element={<RetailerList passFunction={acceptCartObjectCount} cartLength={cartLengthForNavBar}/>} />
        <Route path="/myCart" element={<MyCart />} />
      </Route>
    </Routes>
  );
};
