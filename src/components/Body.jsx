import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import axios from "axios";

import { useState, useEffect } from "react";

const userTypeMapping = {
  0: "Student",
  1: "Faculty",
  2: "Alumni",
};

const Body = () => {
  const [users, setUsers] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/admin/inactive_users`
      );

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const approveAccount = async (e, index) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/admin/activate_user/${index}`
      );

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Typography
          component="div"
          variant="h6"
          sx={{
            my: 2,
          }}
        >
          Accounts pending for approval
        </Typography>
        {showAlert && (
          <Alert
            severity="success"
            sx={{
              my: 2,
            }}
          >
            <AlertTitle>Success</AlertTitle>
            The user has been approved successfully!
          </Alert>
        )}

        <IconButton onClick={(e) => getUsers()}>
          <RefreshIcon />
        </IconButton>

        {users && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>S.No.</b>
                  </TableCell>
                  <TableCell>
                    <b>Roll No./Faculty Id/Alumni Id</b>
                  </TableCell>
                  <TableCell>
                    <b>Email</b>
                  </TableCell>
                  <TableCell>
                    <b>Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Designation</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Approve</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}.
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.roll_no}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.first_name}&nbsp;{user.last_name}
                    </TableCell>
                    <TableCell>{userTypeMapping[user.user_type]}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(e) => approveAccount(e, user.id)}>
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default Body;
