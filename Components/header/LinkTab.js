import * as React from "react";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core";
import Tab from "@material-ui/core";

const LinkTab = (props) => {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default LinkTab