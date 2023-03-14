import React, { useEffect, useState } from "react";
import {
  faClone,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Snackbar } from "@material-ui/core/";
import CustomAlert from "./CustomAlert";

type Tprops = {
  value: string;
};

export default function CopyToClipBoard({ value }: Tprops) {
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
        <FontAwesomeIcon icon={faClone} color="black" size="2xs" />
      </IconButton>
      {isLink && (
        <IconButton onClick={handleRef}>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            color="black"
            size="2xs"
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
