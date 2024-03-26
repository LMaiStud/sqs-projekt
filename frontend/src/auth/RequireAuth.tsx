import { CircularProgress } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

// checks if user is authenticated and redirects to child components. Otherwise redirect to login page
export const RequireAuth = ({ children }: Props) => {
  const [auth, setAuth] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    let token = localStorage.getItem("token");
    if (token !== null) {
      fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/v1/users/auth/check`, {
        headers: {
          authorization: `Bearer ` + token,
        },
      })
        .then((response) => response.text())
        .then((status) => {
          if (status === "OK") {
            setAuth(true);
          } else {
            setAuth(false);
          }
        });
    } else {
      setAuth(false);
    }
  });

  if (auth === undefined) return <CircularProgress className="loading" />;

  return auth ? <>{children}</> : <Navigate to="/login" />;
};
