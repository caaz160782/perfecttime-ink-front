import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

const Drawer = () => {
  return (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <List>
          <ListItem divider button>
            <NextLink href="/" passHref>
              <Link>
                <ListItemText disableTypography className={classes.linkDrawer}>
                  Inicio
                </ListItemText>
              </Link>
            </NextLink>
          </ListItem>
          <ListItem divider button>
            <NextLink href="/servicios" passHref>
              <Link>
                <ListItemText disableTypography className={classes.linkDrawer}>
                  Servicios
                </ListItemText>
              </Link>
            </NextLink>
          </ListItem>
          <ListItem divider button>
            <NextLink href="/galeria" passHref>
              <Link>
                <ListItemText disableTypography className={classes.linkDrawer}>
                  Galeria
                </ListItemText>
              </Link>
            </NextLink>
          </ListItem>
          <ListItem divider button>
            <NextLink href="/contacto" passHref>
              <Link>
                <ListItemText disableTypography className={classes.linkDrawer}>
                  Contacto
                </ListItemText>
              </Link>
            </NextLink>
          </ListItem>
          <ListItem divider button>
            <NextLink href="/login" passHref>
              <Link>
                <ListItemText
                  disableTypography
                  className={classes.linkDrawerLogin}
                >
                  Login
                </ListItemText>
              </Link>
            </NextLink>
          </ListItem>
        </List>
      </SwipeableDrawer>

      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );
};
export default Drawer;
