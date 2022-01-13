import React, { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = React.createContext([{}, () => {}]);

const AuthProvider = (props) => {
  const defaultUserVal = {
    token: "",
    autenticado: false,
    infoUser: {},
    infoStudio: {},
  };

  const [userVal, setUserVal] = useLocalStorage("userVal", defaultUserVal);
  //const [valStudio, setStudio] = useLocalStorage("idStudio", "");
  const [auth, guardarAuth] = useState(userVal);

  const logOut = () => {
    guardarAuth(defaultUserVal);
  };

  //const saveToken = (token) => guardarAuth({ ...auth, token });
  const saveinfoStudio = (infoStudio) => guardarAuth({ ...auth, infoStudio });

  useEffect(() => {
    setUserVal(auth);
    console.log("===>", auth);
  }, [auth]);
  return (
    <AuthContext.Provider value={{ auth, guardarAuth, logOut, saveinfoStudio }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
