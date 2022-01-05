import '../styles/globals.css'
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import  {AuthContext, AuthProvider} from "../Context/AuthContext";
import { useContext } from "react";



function MyApp({ Component, pageProps }) {

  const [auth, guardarAuth] = useContext(AuthContext);

  return (
    <AuthProvider value={[auth, guardarAuth]}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp
