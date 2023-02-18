import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CardActionArea, CardContent, Typography } from "@material-ui/core";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 270,
      height: 325,
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "16px",
    },
    cardContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    media: {
      height: 140,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#6A5DF9",
      gap: "8px",
    },
    countColor: {
      color: "#6A5DF9",
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
      <CardContent className={classes.cardContainer}>
        <CardHeader
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
            <Typography variant="body2">Add Products</Typography>
          </CardMedia>
        ) : (
          <CardMedia
            className={classes.media}
            image="https://i.dummyjson.com/data/products/1/1.jpg"
          />
        )}
        <CardHeader
          className={classes.countColor}
          title={`${productCount > 1 ? productCount : 0} Products`}
          subheader={`Created: ${createdAt ? createdAt : "No date"}`}
          titleTypographyProps={{ variant: "body1" }}
          subheaderTypographyProps={{ variant: "body2" }}
        />
      </CardContent>
    </Card>
  );
}
