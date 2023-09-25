import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackDrop from "../../components/BackDrop/BackDrop";
import { EditUser } from "../../components/EditUser/EditUser";
import { getCurrentUser } from "../../store/action/user";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = useSelector((store) => store.loader.open);
  const token = useSelector((store) => store.user.activeUser.token);
  const userDetails = useSelector((store) => store.user.userDetails);

  useEffect(() => {
    if (!userDetails.username) navigate("/login");
    dispatch(getCurrentUser(token));
  }, []);

  return (
    <>
      {userDetails.username && (
        <Grid
          container
          spacing={4}
          padding={10}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <EditUser allUserDetails={userDetails} isCurrent={true} />
          <Grid item xs={6} md={8}>
            <Button
              size="medium"
              variant="outlined"
              color="secondary"
              onClick={() => {
                navigate("/logout");
              }}
            >
              Log Out
            </Button>
          </Grid>
          <BackDrop open={open} />
        </Grid>
      )}
    </>
  );
};

export default User;
