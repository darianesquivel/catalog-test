import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import {
  CardContent,
  CardActionArea,
  CardHeader,
  Typography,
  Card,
} from "@material-ui/core/";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";
import FormCreator from "../FormCreator/FormCreator";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 270,
    height: 325,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
  },
  cardContent: {
    border: "1px dashed #6A5DF9",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#6A5DF9",
  },
}));

export default function CatalogCreator({ className }: any) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen((prev) => !prev);

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea onClick={handleModal}>
          <CardContent className={classes.cardContent}>
            <FontAwesomeIcon size="2xl" icon={faPlus} />
            <Typography variant="body2">Create a new catalog</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <FormCreator handleModal={handleModal} isOpen={open} />
    </>
  );
}
