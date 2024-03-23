import React, { useState} from "react";
import Alert from "@mui/joy/Alert";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Transition } from "react-transition-group";

export default function AlertWithDecorators({message}) {
  const [showAlert, setShowAlert] = useState(true);


  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <Transition in={showAlert} timeout={500} unmountOnExit>
      {(state) => (
        <Box
          sx={{
            position: "fixed",
            top: 10,
            right: state === "entered" ? 5 : -300, 
            transition: "right 0.5s ease-in-out",
          }}
        >
          <Alert
            variant="outlined"
            color="neutral"
            endDecorator={
              <IconButton
                variant="plain"
                size="sm"
                color="neutral"
                onClick={handleAlertClose}
              >
                <CloseRoundedIcon />
              </IconButton>
            }
          >
            {message}
          </Alert>
        </Box>
      )}
    </Transition>
  );
}
