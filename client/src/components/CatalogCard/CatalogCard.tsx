import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  CardContent,
  Typography,
  Popover,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  MenuItem,
  Menu,
  Dialog,
  MenuList,
  Paper,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { faCartPlus, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import CustomAlert from "../Alert/CustomAlert";
import CustomDialog from "../CustomDialog/CustomDialog";
import FormCreator from "../FormCreator/FormCreator";
import updateCatalog from "../../api/updateCatalog";
import removeCatalog from "../../api/removeCatalog";
// este tipado se repite en catalog explorer, modularizar
type TcatalogCard = {
  id: string;
  name: string;
  products?: number;
  createdAt?: string;
  image?: string;
  productCount: number;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 355,
      borderRadius: "8px",
      display: "flex",
    },
    cardContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "0px",
    },
    media: {
      height: 300,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#6A5DF9",
      gap: "8px",
    },
    headerContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      boxSizing: "border-box",
    },
    footerContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    typography: {
      fontWeight: 200,
    },
    products: {
      color: "#6A5DF9",
      fontSize: "14px",
      marginBottom: "5px",
    },
    createdAt: {
      display: "flex",
      alignItems: "center",
      color: "grey",
      fontWeight: "lighter",
      fontSize: "14px",
      gap: "8px",
    },
    link: {
      width: "100%",
      textDecoration: "none",
    },
  })
);

export default function CatalogCard({
  id,
  name,
  products,
  createdAt,
  image,
  productCount,
}: TcatalogCard) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [option, setOption] = useState<string>("");

  const openOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOption("");
  };

  const handleOption = (event: any) => {
    const eventName = event.target.id;
    setOption(eventName);
  };

  const menuOpen = Boolean(anchorEl);
  const targetId = menuOpen ? "simple-popover" : undefined;
  const renderDialog =
    option === "edit" ? (
      <FormCreator
        handleModal={handleClose}
        isOpen={true}
        apiFunction={updateCatalog}
        initialValues={{ id, name }}
      />
    ) : option === "remove" ? (
      <CustomDialog
        isOpen={Boolean(option)}
        handleModal={handleClose}
        handleAccept={() => removeCatalog({ id })}
        queryKey="catalogs"
      >
        <Typography variant="h6">
          You are about to delete the catalog <b>{name}</b>. Are you sure?
        </Typography>
        <CustomAlert
          message="This action can't be undone."
          alertType="error"
          variant="filled"
          title={false}
        />
      </CustomDialog>
    ) : null;
  return (
    <>
      <Link
        className={classes.link}
        to={productCount < 1 ? `catalogs` : `/catalogs/${id}`}
      >
        <Card className={classes.root}>
          <CardContent className={classes.cardContainer}>
            <CardHeader
              className={classes.headerContainer}
              action={
                <>
                  <IconButton onClick={openOptions} aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                  <Popover
                    id={targetId}
                    open={menuOpen}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <MenuList>
                      <MenuItem onClick={handleOption} id="edit">
                        Edit catalog
                      </MenuItem>
                      <MenuItem id="duplicate" onClick={handleOption}>
                        Duplicate catalog
                      </MenuItem>
                      <MenuItem onClick={handleOption} id="remove">
                        Remove catalog
                      </MenuItem>
                    </MenuList>
                  </Popover>
                </>
              }
              title={name ? name : "Default"}
              titleTypographyProps={{ variant: "body2" }}
            />
            {productCount < 1 ? (
              <CardMedia
                onClick={() => {
                  alert("add products under development");
                }}
                className={classes.media}
              >
                <FontAwesomeIcon size="2xl" icon={faCartPlus} />
                <Typography variant="body2" className={classes.typography}>
                  Add Products
                </Typography>
              </CardMedia>
            ) : (
              <CardMedia
                className={classes.media}
                image="https://i.dummyjson.com/data/products/1/1.jpg"
              />
            )}
            <CardContent className={classes.footerContainer}>
              <Typography className={classes.products}>{`${
                productCount > 1 ? productCount : 0
              } products`}</Typography>
              <Typography className={classes.createdAt}>
                <FontAwesomeIcon size="1x" icon={faCalendarDay} />
                {`Created: ${createdAt ? createdAt : "no date"}`}
              </Typography>
            </CardContent>
          </CardContent>
        </Card>
      </Link>
      {renderDialog}
    </>
  );
}
