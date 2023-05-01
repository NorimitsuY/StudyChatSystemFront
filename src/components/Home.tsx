import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Box,
  TextField,
  CircularProgress,
  Modal,
  Typography,
  Backdrop,
  LinearProgress,
  SvgIcon,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import StartIcon from "@mui/icons-material/Start";
import { loginCheck, getLoginUserInfo } from "../service/common/userService";
import { LoginUserInfo } from "../models/LoginUserInfo";

let loginUserInfo: LoginUserInfo;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const flag = await loginCheck();
      setLoading(false);
      if (!flag) {
        navigate("/login");
      } else {
        const data = await getLoginUserInfo();
        loginUserInfo._id = data._id;
        loginUserInfo.email = data.email;
        loginUserInfo.name = data.name;
        loginUserInfo.usertype = data.usertype;
      }
    })();
  }, []);

  useLayoutEffect(() => {
    loginUserInfo = {
      _id: "",
      email: "",
      name: "",
      usertype: "",
    };
  }, []);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Toolbar />
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </Backdrop>
      )}
      <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "95%",
            width: "90%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
          }}
        ></Box>
      </Modal>
    </Grid>
  );
}
