import React, { useState } from 'react';

const AuthContext = React.createContext([ {}, () => {} ]);

const AuthProvider = props => {

    const [auth, guardarAuth ] = useState({
         auth: false,
    });

    return (
        <AuthContext.Provider value={[auth, guardarAuth]}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider};