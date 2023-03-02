import { useState } from "react";
import FormCreator from "../FormCreator/FormCreator";
import createCatalog from "../../api/createCatalog";

// MUI
import { CardActionArea, Typography, Card } from "@material-ui/core/";

// ICONS
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// STYLES
import useStyles from "./styles";

export default function CatalogCreator() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen((prev) => !prev);

  return (
    <>
      <Card className={classes.creatorContainer}>
        <CardActionArea className={classes.cardContent} onClick={handleModal}>
          <FontAwesomeIcon size="2xl" icon={faPlus} />
          <Typography variant="body2">Create a new catalog</Typography>
        </CardActionArea>
      </Card>
      {open && (
        <FormCreator
          handleModal={handleModal}
          isOpen={open}
          apiFunction={createCatalog}
          keysToInvalidate={["catalogs"]}
          acceptBtnName="Create"
        />
      )}
    </>
  );
}
