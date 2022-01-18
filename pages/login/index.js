import React from "react";
import FrmLogin from "../../Components/Login/FrmLogin";
import NextLink from "next/link";

const Login = () => {
  return (
    <div>
      <FrmLogin />
      <h2>
        <NextLink href="/admin">
          <a>Registarse</a>
        </NextLink>
      </h2>
    </div>
  );
};
export default Login;
