import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex" }}>
          <Logo />
          <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#C307E7"
                to="/chat"
                text="Go To Chat"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/"
                text="logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#C307E7"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
        {/* this div is for auth and if user is logged in then differnt bg coloer and different link to chat is not logged in then to signup */}
        </Toolbar>
    </AppBar>
  );
};

export default Header;
