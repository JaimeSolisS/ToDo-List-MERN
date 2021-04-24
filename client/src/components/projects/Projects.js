import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import NewProject from "./NewProject";
import ProjectList from "./ProjectList";
import MeetingRoomRoundedIcon from "@material-ui/icons/MeetingRoomRounded";
import { Link } from "react-router-dom";

import TaskList from "../tasks/TaskList";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  icon: {},
  avatar: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.primary.main
        : theme.palette.primary.light,
    margin: ".5rem",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Projects(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {/* -------------------- Side Bar -----------------------------*/}
      <div className={classes.toolbar}>
        <Grid container justify="center">
          <Avatar className={classes.avatar}>
            <CheckRoundedIcon className={classes.icon} />
          </Avatar>
        </Grid>
      </div>

      <Divider />

      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Typography gutterBottom />
              <Typography variant="h5" gutterBottom>
                Projects
              </Typography>
            </Grid>
            <Grid item>
              <NewProject />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <ProjectList />
        </Grid>
      </Grid>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* -----------------------Header -------------------------------*/}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid container justify="space-between">
            <Typography variant="h6" noWrap>
              Hey User
            </Typography>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Grid container justify="space-between">
                <MeetingRoomRoundedIcon />
                <Typography variant="h6">Sign out</Typography>
              </Grid>
            </Link>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* --------------------------CONTENT ----------------------------*/}

        <TaskList />
      </main>
    </div>
  );
}

Projects.propTypes = {
  window: PropTypes.func,
};

export default Projects;
