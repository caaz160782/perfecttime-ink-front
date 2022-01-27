import React, { useState } from "react";
import FrmLogin from "../../Components/Login/FrmLogin";

const Login = () => {
  return (
    <div>
      <FrmLogin />
      <h2>
        <NextLink href="/admin">
          <a>Aun no tienes cuenta con nosotros? Crea una aqui</a>
        </NextLink>
      </h2>
    </div>
  );
};
export default Login;
