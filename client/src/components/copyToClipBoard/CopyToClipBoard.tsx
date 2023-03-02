import React, { useEffect, useState } from "react";
import {
  faClone,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Snackbar, Theme } from "@material-ui/core/";
import CustomAlert from "../Alert/CustomAlert";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => {
  return {
    icon: {
      fontSize: "16px",
    },
  };
});
// type Tsizes =
//   | "1x"
//   | "2x"
//   | "3x"
//   | "4x"
//   | "5x"
//   | "6x"
//   | "7x"
//   | "8x"
//   | "9x"
//   | "10x"
//   | "2xl"
//   | "2xs"
//   | "xl"
//   | "xs"
//   | "sm"
//   | "lg";

type Tprops = {
  value: string;
};

export default function CopyToClipBoard({ value }: Tprops) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const isLink = /http.:\/\/.{3,}\./gi.test(value);

  const handleRef = () => {
    window.open(value, "_blank");
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setOpen(true);
  };
  useEffect(() => {
    if (open) {
      const timeout = open ? setTimeout(() => setOpen(false), 2000) : "";
      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    <>
      <IconButton onClick={handleCopy}>
        <FontAwesomeIcon
          icon={faClone}
          color="black"
          size="xs"
          className={`${classes.icon} `}
        />
      </IconButton>
      {isLink && (
        <IconButton onClick={handleRef}>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            color="black"
            size="xs"
            className={`${classes.icon}`}
          />
        </IconButton>
      )}

      <Snackbar
        open={open}
        autoHideDuration={600}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <CustomAlert
          // onClose={handleClose}
          title="copied"
          alertType="success"
          message="Field copied successfully"
        />
      </Snackbar>
    </>
  );
}