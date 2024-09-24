import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../nav/navbar";
import { Welcome } from "../welcome/Welcome";
import { NurseriesList } from "../nurseries/NurseriesList";
import { DistributorsList } from "../distributors/DistributorsList";
import { RetailerList } from "../retailers/RetailerList";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="/nurseries" element={<NurseriesList />} />
        <Route path="/distributors" element={<DistributorsList />} />
        <Route path="/retailers" element={<RetailerList />} />
      </Route>
    </Routes>
  );
};
