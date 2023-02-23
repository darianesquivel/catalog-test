import { makeStyles } from "@material-ui/core/styles";

import { CardActionArea, Typography, Card } from "@material-ui/core/";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";
import FormCreator from "../FormCreator/FormCreator";
import createCatalog from "../../api/createCatalog";

const useStyles = makeStyles(() => ({
  root: {
    height: 325,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
  },
  cardContent: {
    height: "100%",
    border: "1px dashed #6A5DF9",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#6A5DF9",
    textAlign: "center",
    padding: "16px",
  },
  icon: {
    fontWeight: 800,
  },
}));

export default function CatalogCreator({ className }: any) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen((prev) => !prev);

  return (
    <div className={className}>
      <Card className={classes.root}>
        <CardActionArea className={classes.cardContent} onClick={handleModal}>
          <FontAwesomeIcon className={classes.icon} size="2xl" icon={faPlus} />
          <Typography variant="body2">Create a new catalog</Typography>
        </CardActionArea>
      </Card>
      {open && (
        <FormCreator
          handleModal={handleModal}
          isOpen={open}
          apiFunction={createCatalog}
        />
      )}
    </div>
  );
}
