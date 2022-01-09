import React, { useState } from 'react';

const AuthContext = React.createContext([ {}, () => {} ]);

const AuthProvider = props => {

    const [auth, guardarAuth] = useState({
      token:"",
      auth: false,
      infoUser:{},
      setReloadUser:()=>null
    });

    return (
        <AuthContext.Provider value={[auth, guardarAuth]}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider};