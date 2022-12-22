import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useDispatch } from "react-redux";
import { setAccessToken } from "../redux/slices/adminSlice";

export default function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [isRequesting, setIsRequesting] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsRequesting(true);

    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/auth/login`,
        formState
      );

      if (response) {
        dispatch(setAccessToken(response.data.access_token));
        setIsRequesting(false);
        navigate("/");
      }
    } catch (error) {
      if (!error.response.data) {
        alert("Something went wrong! Try again later...");
        setIsRequesting(false);
        return;
      }
      console.error(error.response.data.detail);
      alert(error.response.data.detail);
      setIsRequesting(false);
      setFormState({ ...formState, email: "", password: "" });
      return;
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography
        component="div"
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          my: 1,
        }}
      >
        Login
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { my: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          fullWidth
          id="outlined-required"
          label="Email"
          placeholder="admin@gmail.com"
          type="email"
          name="email"
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          id="outlined-password-input"
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ my: 1 }}
          size="large"
          fullWidth
          disabled={isRequesting}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
