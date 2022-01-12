
import Layout from "../../Components/Layout";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useRouter } from "next/router";
//import { InfoOutlined } from "@material-ui/icons";
//import FadeMenu from "../../Components/staff/Menu";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

const Agenda = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const [valToken] = useLocalStorage("userVal");
  const router = useRouter();

  if (valToken) {
    const { token, auth, infoUser } = valToken;
    console.log(1,infoUser.name)
    console.log(2,infoUser._id)
    return (
      <Layout>
        <h1>agenda</h1>
        <div>
          <Button
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Dashboardvv
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </Layout>
    );
  } else{
    return (
      <Layout>
        <h1>No autorizdddado</h1>

      </Layout>
    );
    //router.push("/agenda")
  }


};
export default Agenda;
