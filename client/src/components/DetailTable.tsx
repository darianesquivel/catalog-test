import { Tooltip } from "@material-ui/core/";

//STYLES
import useStyles from "./styles";

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
