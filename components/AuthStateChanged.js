import useAuth from "../context/authContext";
import AuthService from "../services/AuthService";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

export default function AuthStateChanged({ children }) {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.authStateChanged((credentials) => {
      setUser(credentials);
      setLoading(false);
    });
  }, [setUser]);

  if (loading) {
    return <Spinner />;
  }

  return children;
}
