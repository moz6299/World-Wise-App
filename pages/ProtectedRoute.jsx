import React, { useEffect } from "react";
import { useAuth } from "../src/contexts/FakeUserAuth";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return  isAuthenticated? <>{children}</> : null;
};

export default ProtectedRoute;
