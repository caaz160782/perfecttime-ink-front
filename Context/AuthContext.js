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
  const [auth, guardarAuth] = useState(userVal);
  //const [valStudio, setStudio] = useLocalStorage("idStudio", "");

  // useEffect(() => {
  //   guardarAuth(userVal);
  //   return () => {
  //     console.log("cleanup;");
  //   };
  // }, []);

  const router = useRouter();
  const logOut = () => {
    guardarAuth(defaultUserVal);
    router.push("/");
  };
 
  //const saveToken = (token) => guardarAuth({ ...auth, token });
  const saveinfoStudio = (infoStudio) => guardarAuth({ ...auth, infoStudio });

  useEffect(() => {
    setUserVal(auth);
    console.log("===> 1", auth);
  }, [auth]);


  return (
    <AuthContext.Provider value={{ auth, guardarAuth, logOut, saveinfoStudio }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

// const AuthProvider = (props) => {
//   const defaultUserVal = {
//     token: "",
//     autenticado: false,
//     infoUser: {},
//     infoStudio: {},
//   };
//   const [auth, guardarAuth] = useState(defaultUserVal);
//   const [userVal, setUserVal] = useLocalStorage("userVal", defaultUserVal);
//   useEffect(() => {
//     //const [valStudio, setStudio] = useLocalStorage("idStudio", "");
//     guardarAuth(userVal);
//     return () => {
//       console.log("cleanup;");
//     };
//   }, []);
//   const router = useRouter();
//   const logOut = () => {
//     guardarAuth(defaultUserVal);
//     router.push("/");
//   };
//   //const saveToken = (token) => guardarAuth({ ...auth, token });
//   const saveinfoStudio = (infoStudio) => guardarAuth({ ...auth, infoStudio });
//   useEffect(() => {
//     setUserVal(auth);
//     console.log("===> 1", auth);
//   }, [auth]);
//   // if (auth === undefined) return null;
//   // console.log("===> 2", auth);
//   return (
//     <AuthContext.Provider value={{ auth, guardarAuth, logOut, saveinfoStudio }}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };
