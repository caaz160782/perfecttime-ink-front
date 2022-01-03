import '../styles/globals.css'
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { CRMContext, CRMProvider } from "../utils/CRMContext";
import { useContext } from "react";


function MyApp({ Component, pageProps }) {
  const [auth, guardarAuth] = useContext(CRMContext);
  return (
    <CRMProvider value={[auth, guardarAuth]}>
      <Component {...pageProps} />
    </CRMProvider>
  );
}

export default MyApp
