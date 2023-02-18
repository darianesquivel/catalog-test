import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CardActionArea, CardContent, Typography } from "@material-ui/core";
import { faCartPlus, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    },
    media: {
      width: "100%",
      height: 500,
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
      padding: "16px",
      boxSizing: "border-box",
    },
    footerContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: "16px",
      boxSizing: "border-box",
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
  })
);

export default function CatalogCard({
  id, // este id se va a utilizar para borrar catalogos
  name,
  products,
  createdAt,
  image,
  productCount,
}: TcatalogCard) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.cardContainer}>
        <CardHeader
          className={classes.headerContainer}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
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
      </CardActionArea>
    </Card>
  );
}
