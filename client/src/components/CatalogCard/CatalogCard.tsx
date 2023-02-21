import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CardContent, Typography } from "@material-ui/core";
import { faCartPlus, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
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
      textDecoration: "none",
    },
    mediaContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
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
  return (
    <Link
      className={classes.link}
      to={productCount < 1 ? `catalogs` : `/catalogs/${id}`}
    >
      <Card className={classes.root}>
        <CardContent className={classes.cardContainer}>
          <CardHeader
            className={classes.headerContainer}
            action={
              <IconButton
                onClick={() => {
                  alert("more options under development");
                }}
                aria-label="settings"
              >
                <MoreVertIcon />
              </IconButton>
            }
            title={name ? name : "Default"}
            titleTypographyProps={{ variant: "body2" }}
          />
          {productCount < 1 ? (
            <Link className={classes.media} to={`/addproducts/${id}`}>
              <CardMedia className={classes.mediaContent}>
                <FontAwesomeIcon size="2xl" icon={faCartPlus} />
                <Typography variant="body2" className={classes.typography}>
                  Add Products
                </Typography>
              </CardMedia>
            </Link>
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
  );
}
