import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../../store/reducer/loaderReducer";
import Footer from "../Footer/Footer";

export default function Layout({ children, title, background }) {
  document.title = title;

  const dispatch = useDispatch();
  const toast = useSelector((store) => store.loader.toast);

  const handleClose = () => dispatch(setToast(""));
  return (
    <Box
      sx={{
        backgroundImage: background,
      }}
    >
      <Navbar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Box marginTop={5}>{children}</Box>
        <Footer
          sx={{
            borderTop: "1px solid #000",
            marginTop: "auto",
            p: 4,
          }}
          component="footer"
        />
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        open={toast !== ""}
        onClose={handleClose}
        message={toast}
        key={"bottom-center"}
      />
    </Box>
  );
}
