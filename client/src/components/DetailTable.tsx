import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core/";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    fontFamily: "Inter, -apple-system, Arial, Sans-Serif",
    padding: theme.spacing(1.2),
    overflow: "auto",
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
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
}));

type Trows = {
  rows: { key: string; value: string }[];
  keysNobold?: boolean;
  extraStyles?: any;
};

export default function DetailTable({ rows, keysNobold, extraStyles }: Trows) {
  const classes = useStyles();
  const renderRows = rows.map((row: any) => Object.values(row)).flat();

  return (
    <div className={`${classes.container} ${extraStyles}`}>
      {renderRows.map((value: any, index: number) => (
        <Tooltip title={value} key={`${value}-${index}`}>
          <span
            className={`${index % 2 === 0 && !keysNobold ? classes.bold : ""} ${
              classes.bullet
            } ${classes.ellipsis}`}
          >
            {value}
          </span>
        </Tooltip>
      ))}
    </div>
  );
}
