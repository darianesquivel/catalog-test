import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import {
  CardContent,
  CardActionArea,
  CardHeader,
  Typography,
  Card,
} from "@material-ui/core/";
import { useState } from "react";
import FormCreator from "../FormCreator/FormCreator";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "268px",
    height: "330px",
    borderRadius: "8px",
    display: "flex",
    // flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
  },

  cardContent: {
    border: "1px dashed #6A5DF9",
    borderRadius: "4px",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
  },
  icon: {},
}));

export default function CatalogCreator({ className }: any) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen((prev) => !prev);

  return (
    <>
      <Card className={`${classes.root} ${className}`}>
        <CardActionArea onClick={handleModal}>
          <CardContent className={classes.cardContent}>
            <AddIcon
              className={classes.icon}
              color="primary"
              fontSize="large"
            />
            <Typography variant="body1" color="primary">
              Create a new catalog
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <FormCreator handleModal={handleModal} isOpen={open} />
    </>
  );
}
