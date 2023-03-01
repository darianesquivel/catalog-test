import { CardActionArea, Typography, Card } from "@material-ui/core/";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";
import FormCreator from "../FormCreator/FormCreator";
import createCatalog from "../../api/createCatalog";

//STYLES
import useStyles from "./styles";

export default function CatalogCreator({ className }: any) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen((prev) => !prev);

  return (
    <>
      <Card className={classes.cardCreator}>
        <CardActionArea
          className={classes.creatorContent}
          onClick={handleModal}
        >
          <FontAwesomeIcon className={classes.icon} size="2xl" icon={faPlus} />
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
