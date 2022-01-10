
import Layout from "../../Components/Layout";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useRouter } from "next/router";
//import { InfoOutlined } from "@material-ui/icons";

const Agenda = () => {
  const [valToken] = useLocalStorage("userVal");
  const router = useRouter();

  if (valToken) {
    const { token, auth, infoUser } = valToken;
    console.log(1,infoUser.name)
    console.log(2,infoUser._id)
    return (
      <Layout>
        <h1>agenda</h1>
      </Layout>
    );
  } else{
    return (
      <Layout>
        <h1>No autorizado</h1>
      </Layout>
    );
    //router.push("/agenda")
  }


};
export default Agenda;
