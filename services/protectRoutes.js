import Router from "next/router";
import useAuth from "../context/authContext";

export function withPublic(Component) {
  return function WithPublic(props) {
    const auth = useAuth();

    if (auth.user) {
      Router.replace("/");
      return <h1>Loading...</h1>;
    }
    return <Component auth={auth} {...props} />;
  };
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth();

    if (!auth.user) {
      Router.push("/login");
      return <h1>Loading...</h1>;
    }

    return <Component auth={auth} {...props} />;
  };
}
