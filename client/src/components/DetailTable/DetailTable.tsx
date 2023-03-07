import { useRef, useState } from "react";
import { Tooltip, Typography } from "@material-ui/core/";
import CopyToClipBoard from "../CopyToClipBoard/CopyToClipBoard";

// STYLES
import useStyles from "./styles";

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
