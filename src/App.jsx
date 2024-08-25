import  { lazy, Suspense,  } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CityList from "../components/CityList";
import CountryList from "../components/CountryList";
import City from "./../components/City";
import Form from "../components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeUserAuth";
import ProtectedRoute from "../pages/ProtectedRoute";
import SpinnerFullPage from "./../components/SpinnerFullPage";

const Homepage = lazy(() => import("./../pages/Homepage"));
const Product = lazy(() => import("./../pages/Product"));
const Pricing = lazy(() => import("./../pages/Pricing"));
const AppLayout = lazy(() => import("./../pages/AppLayout"));
const PageNotFound = lazy(() => import("./../pages/PageNotFound"));
const Login = lazy(() => import("./../pages/Login"));

//import Homepage from "./../pages/Homepage";
//import Product from "./../pages/Product";
//import Pricing from "./../pages/Pricing";
//import AppLayout from "./../pages/AppLayout";
//import PageNotFound from "./../pages/PageNotFound";
//import Login from "../pages/Login";


const App = () => {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/pricing" element={<Pricing />} />

              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
};

export default App;
