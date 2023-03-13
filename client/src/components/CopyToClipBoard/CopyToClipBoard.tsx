import React, { useEffect, useState } from "react";
import {
  faClone,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Snackbar } from "@material-ui/core/";
import CustomAlert from "../Alert/CustomAlert";

// STYLES
import useStyles from "./styles";

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
          title="copied"
          alertType="success"
          message="Field copied successfully"
        />
      </Snackbar>
    </>
  );
}
