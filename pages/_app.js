import '../styles/globals.css'
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import  {AuthContext, AuthProvider} from "../Context/AuthContext";
import { useContext, useEffect } from "react";



function MyApp({ Component, pageProps }) {

  const [auth, guardarAuth] = useContext(AuthContext);
    //  const authData = useMemo(
    //    () => ({
    //      auth: { name: "claudia" },
    //      token: "",

    //      infoUser: {},
    //      setReloadUser: () => null,
    //    }),
    //    []
    //  );


  return (
    <AuthProvider value={[auth, guardarAuth]}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp
