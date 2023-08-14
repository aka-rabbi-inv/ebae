import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { EditUser } from "../../components/EditUser/EditUser";
import { useState } from "react";
import { setOpenModal } from "../../store/reducer/loaderReducer";
import { Modal } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { chunk } from "lodash";
import { Grid } from "@mui/material";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";

const background =
  "url(https://images.unsplash.com/photo-1630618148126-74d18effc1b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)";

const Users = () => {
  const users = useSelector((store) => store.user.allUsers);

  const [usersLength, setUsersLength] = useState(1);
  const [usersChunk, setUsersChunk] = useState([]);
  const [usersPageNumber, setusersPageNumber] = useState(0);
  const dispatch = useDispatch();
  const [user, setUser] = useState(users[0]);
  const [userDetails, setUserDetails] = useState(users[0]);
  const open = useSelector((store) => store.loader.openModal);
  const handleClose = () => dispatch(setOpenModal(false));

  const openEditUserModal = (userId) => {
    const newUserDetails = users.find((item) => item._id === userId);
    const { address, _id, __v, role, password, ...newUser } = newUserDetails;
    setUser(newUser);
    setUserDetails(newUserDetails);
    dispatch(setOpenModal(true));
  };

  useEffect(() => {
    if (!users || users.length === 0) return;
    const userWithoutAdmin = users.filter((item) => item.role !== "admin");
    const data = chunk(userWithoutAdmin.reverse(), 10);
    setUsersLength(data.length);
    setUsersChunk(data[usersPageNumber]);
  }, [users, usersPageNumber]);

  useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);

  const handleUsersPagination = (event, value) => {
    setusersPageNumber(value - 1);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={5}>
      <AdminSidebar />
      <Grid item xs={12} md={8}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>
                    {row.firstname} {row.lastname}
                  </TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <IconButton
                      sx={{ display: "inline-block" }}
                      onClick={() => openEditUserModal(row._id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{ display: "inline-block" }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="login"
          aria-describedby="login-before-checkout"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EditUser allUserDetails={userDetails} background={background} />
        </Modal>
        <Stack spacing={2} mt={4}>
          <Pagination
            count={usersLength}
            variant="outlined"
            shape="rounded"
            onChange={handleUsersPagination}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Users;
