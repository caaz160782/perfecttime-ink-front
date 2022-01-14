import React, { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
const AuthContext = React.createContext([{}, () => {}]);
import { useRouter } from "next/router";

const AuthProvider = (props) => {
  const defaultUserVal = {
    token: "",
    autenticado: false,
    infoUser: {},
    infoStudio: {},
  };

  const [userVal, setUserVal] = useLocalStorage("userVal", defaultUserVal);
  const [auth, guardarAuth] = useState(userVal);
  const router = useRouter();

  const logOut = () => {
    guardarAuth(defaultUserVal);
    router.push("/");
  };

  //const saveToken = (token) => guardarAuth({ ...auth, token });
  const saveinfoStudio = (infoStudio) => guardarAuth({ ...auth, infoStudio });

  useEffect(() => {
    setUserVal(auth);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, guardarAuth, logOut, saveinfoStudio }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
