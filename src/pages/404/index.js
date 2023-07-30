import { useEffect } from "react";
import { Box } from "@mui/material";
import { giphyURL } from "./giphyURL";
import { useSelector, useDispatch } from "react-redux";
import { getGif } from "../../store/action/errorGifs";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const dispatch = useDispatch();
  const gif = useSelector((store) => store.loader.gif);

  useEffect(() => {
    dispatch(getGif(giphyURL));
  }, []);

  return (
    <Box
      style={{
        backgroundImage: "url(" + gif + ")",
        height: "350px",
        width: "100%",
        position: "relative",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      sx={{
        top: "15vh",
      }}
    ></Box>
  );
};

export default NotFound;
