import React, { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRouter } from "next/router";

const AuthContext = React.createContext([{}, () => {}]);

const AuthProvider = (props) => {
  const defaultUserVal = {
    token: "",
    autenticado: false,
    infoUser: {},
    infoStudio: {},
  };

  // const [auth, guardarAuth] = useState(defaultUserVal);
  const [userVal, setUserVal] = useLocalStorage("userVal", defaultUserVal);
  console.log("****************", userVal);
  const [auth, guardarAuth] = useState(userVal);
  //const [valStudio, setStudio] = useLocalStorage("idStudio", "");
  const router = useRouter();

  // useEffect(() => {
  //   guardarAuth(userVal);
  //   return () => {
  //     console.log("cleanup;");
  //   };
  // }, []);

  const logOut = () => {
    guardarAuth(defaultUserVal);
    console.log("deslogear");
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
