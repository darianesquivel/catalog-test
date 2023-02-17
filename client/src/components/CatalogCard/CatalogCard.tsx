import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CardActionArea, Typography } from "@material-ui/core";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TcatalogCard = {
  id: string;
  title: string;
  products?: number;
  createdAt?: string;
  image?: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "300px",
      borderRadius: "8px",
    },
    media: {
      height: "22vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "grey",
      gap: "8px",
    },
  })
);

export default function CatalogCard({
  id,
  title,
  products,
  createdAt,
  image,
}: TcatalogCard) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title ? title : "Default"}
          titleTypographyProps={{ variant: "body2" }}
        />
        {!products ? (
          <CardMedia
            onClick={() => {
              alert("add products under development");
            }}
            className={classes.media}
          >
            <FontAwesomeIcon size="2xl" icon={faCartPlus} />
            <Typography>Add Products</Typography>
          </CardMedia>
        ) : (
          <CardMedia className={classes.media} image={image} />
        )}
        <CardHeader
          title={`${products ? products : 0} Products`}
          subheader={`Created: ${createdAt ? createdAt : "No date"}`}
          titleTypographyProps={{ variant: "body1" }}
          subheaderTypographyProps={{ variant: "body2" }}
        />
      </CardActionArea>
    </Card>
  );
}
