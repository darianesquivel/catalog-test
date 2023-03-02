import React, { useRef, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Tooltip, Typography } from "@material-ui/core/";
import CopyToClipBoard from "./copyToClipBoard/CopyToClipBoard";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    fontFamily: "Inter, -apple-system, Arial, Sans-Serif",
    padding: theme.spacing(1.2),
    overflow: "auto",
    display: "grid",
    gridTemplateColumns: "1fr ",
    gap: theme.spacing(2),
    rowGap: theme.spacing(2),
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: "bold",
  },
  bullet: {
    cursor: "pointer",
  },
  ellipsis: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  row: {
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    height: "24px",
  },
  keys: { minWidth: theme.spacing(15) },
  values: {},
}));

type Trows = {
  rows: { key: string; value: string }[];
  boldKeys?: boolean;
  extraStyles?: any;
};

export default function DetailTable({ rows, boldKeys, extraStyles }: Trows) {
  const classes = useStyles();
  const [showClipBoard, setShowClipboard] = useState<any>(null);

  const textRef = useRef(null);
  return (
    <div className={`${classes.container} ${extraStyles}`}>
      {rows.map(({ key, value }, index: number) => {
        return (
          <div
            className={classes.row}
            key={`${value}-${index}`}
            onMouseEnter={() => setShowClipboard(index)}
            onMouseLeave={() => setShowClipboard(null)}
          >
            <Tooltip title={value}>
              <Typography
                variant="body2"
                className={`${classes.keys} ${boldKeys ? classes.bold : ""}`}
              >
                {key}
              </Typography>
            </Tooltip>
            <>
              <Tooltip title={value}>
                <Typography
                  ref={textRef.current}
                  variant="body2"
                  className={`${classes.values} ${classes.ellipsis}`}
                >
                  {value}
                </Typography>
              </Tooltip>
              {showClipBoard === index && <CopyToClipBoard value={value} />}
            </>
          </div>
        );
      })}
    </div>
  );
}
