import {
  createStyles,
  alpha,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBar: {
      width: "100%",
    },
  })
);
