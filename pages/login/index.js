import React from "react";
import Layout from "../../Components/Layout";
import FrmLogin from "../../Components/login/FrmLogin";
import NextLink from "next/link";

const Login = () => {
  return (
    <Layout>
      <FrmLogin />
      <h2>
        <NextLink href="/admin">
          <a>Registarse</a>
        </NextLink>
      </h2>
    </Layout>
  );
};
export default Login;
