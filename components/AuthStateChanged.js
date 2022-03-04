import useAuth from "../context/authContext";
import AuthService from "../services/AuthService";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";

export default function AuthStateChanged({ children }) {
  const { setUser, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const Router = useRouter();

  useEffect(() => {
    // const unsubscribeSnapshot;
    const unsubscribeAuth = AuthService.authStateChanged((credentials) => {
      if (user) {
        Router.push("/login");
      } else {
        setUser(credentials);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [setUser]);

  if (loading) {
    return <Spinner />;
  }

  return children;
}
