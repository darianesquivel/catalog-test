import { useState } from "react";
import FormCreator from "../FormCreator";
import createCatalog from "../../api/createCatalog";
import { useHistory } from "react-router";

// MUI
import { CardActionArea, Typography, Card } from "@material-ui/core/";

// ICONS
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// STYLES
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  creatorContainer: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
  },
  cardContent: {
    height: 325,
    borderRadius: theme.shape.borderRadius / 2,
    border: `1px dashed ${theme.palette.primary.main}`,
    textAlign: "center",
    color: theme.palette.primary.main,
  },
}));

export default function CatalogCreator() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen((prev) => !prev);
  const history = useHistory();

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
          onModalChange={handleModal}
          isOpen={open}
          apiFunction={createCatalog}
          keysToInvalidate={["catalogs"]}
          acceptBtnName="Create"
          extraFn={(resData) => {
            const createdCatalogId = resData[0]?.id;
            if (createdCatalogId)
              history.push(`/catalogs/${createdCatalogId}/upload`);
          }}
        />
      )}
    </>
  );
}
