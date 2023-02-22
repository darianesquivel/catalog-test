import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core/";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    fontFamily: "Inter, -apple-system, Arial, Sans-Serif",
    padding: "10px",
    overflow: "auto",
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gap: "12px",
    rowGap: "15px",
  },
  bold: {
    fontWeight: "bold",
  },
  bullet: {
    cursor: "pointer",
    // textOverflow: "elipsis",
  },
}));

type Trows = {
  rows: { key: string; value: string }[];
};

export default function DetailTable({ rows }: Trows) {
  const classes = useStyles();
  const renderRows = rows.map((row: any) => Object.values(row)).flat();

  return (
    <div className={classes.container}>
      {renderRows.map((value: any, index: number) => (
        <Tooltip title={value}>
          <span
            className={`${index % 2 === 0 ? classes.bold : ""} ${
              classes.bullet
            }`}
          >
            {value.length > 100 ? value.substring(0, 52) + " ..." : value}
          </span>
        </Tooltip>
      ))}
    </div>
  );
}
