import { useContext, createContext, useState } from "react";
import AuthService from "../services/AuthService";

const AuthContext = createContext();

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const signInWithGoogle = async () => {
    const { user, error } = await AuthService.signInWithGoogle();
    setUser(user ?? null);
    setError(error ?? "");
  };

  const signUp = async (email, password, userName) => {
    const { user, error } = await AuthService.signUp(email, password, userName);
    setUser(user ?? null);
    setError(error ?? "");
  };

  const signIn = async (email, password) => {
    const { user, error } = await AuthService.signIn(email, password);
    setUser(user ?? null);
    setError(error ?? "");
  };

  const signOut = async () => {
    await AuthService.signOut();
    setUser(null);
  };

  const value = {
    user,
    error,
    signInWithGoogle,
    signUp,
    signIn,
    signOut,
    setUser,
  };
  return <AuthContext.Provider value={value} {...props} />;
}
