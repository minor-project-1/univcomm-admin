import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../redux/slices/adminSlice";

export default function Header() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.admin.accessToken);

  const navigate = useNavigate();

  const handleLogout = (e) => {
    dispatch(setAccessToken(""));
    navigate("/login");
  };

  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin - Univcomm
          </Typography>
          {accessToken && (
            <Button variant="outlined" color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
    </>
  );
}
