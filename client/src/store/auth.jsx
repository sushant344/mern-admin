import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("mernToken"));
  const [user, setUser] = useState();
  const [services, setServices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const authUserToken = `Bearer ${token}`;

  const API = import.meta.env.VITE_APP_API_URI;

  // store token in localStorage --
  const storeTokeninLS = (serverToken) => {
    setToken(serverToken)
    return localStorage.setItem("mernToken", serverToken);
  };

  // check token is stored in LS ---
  const isLoggedin = !!token;

  // onclick logout btn remove token ---
  const logoutUser = () => {
    setToken("");
    return localStorage.removeItem("mernToken");
  };

  // jwt authentication of user data --
  const userAuthentication = async () => {
    try {
      const response = await fetch(`${API}/api/user`, {
        method: "GET",
        headers: {
          Authorization: authUserToken,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("Error fetching user data");
      }
    } catch (error) {
      console.error("Error:", error);
    }

  }


  // services page cards ---
  const getServices = async()=>{
    try {
      const response = await fetch(`${API}/api/data/services`, {
        method: "GET"
      })
      const data = await response.json();
      setServices(data.msg)
    } catch (error) {
      console.log("Services:", error);
    }
  }



  useEffect(() => {
    userAuthentication();
    getServices();
  }, [token]);

  

  // store all vars in memo function --
  // const value = useMemo(() => ( {storeTokeninLS, logoutUser, isLoggedin, user} ), []);

  return <AuthContext.Provider value={ {storeTokeninLS, logoutUser, isLoggedin, user, services, authUserToken, isLoading, API} }>
    {children}
  </AuthContext.Provider>;
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside provider");
  }

  return authContextValue;
};

AuthProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
