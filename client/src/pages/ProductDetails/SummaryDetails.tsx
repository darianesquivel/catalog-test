import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core/";

const useStyles = makeStyles(() => ({
  container: {
    width: "550px",
    background: "yellow",
    border: "solid 1px black",
    display: "flex",
    flexFlow: "column",
    // justifyContent: "space-evenly",
    padding: 5,
    gap: 22,
    lineHeight: "20px",
  },
  header: {
    border: "solid 1px black",
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gap: 12,
  },
  image: {
    width: "100%",
  },
  description: {
    border: "solid 1px black",
  },
  accordion: {
    border: "solid 1px black",
  },
  titleSection: {},
  headerButtons: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));
// type Tparams = {
//   name: string;
//   images?: string[];
//   image: string;
//   mainImageUrl?: string;
//   description: string;
//   props: any;
// };

export default function SummaryDetails({
  name,
  image,
  catalog_id,
  description,
  id,
}: any) {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <div className={classes.header}>
        <div>
          <img src={image} className={classes.image} />
        </div>
        <div className={classes.titleSection}>
          <Typography variant="body1">Title</Typography>
          <span>{name}</span>
          <Typography variant="body1">Brand</Typography>
          <span> Default</span>
        </div>
      </div>
      <div className={classes.description}>
        <Typography>Description</Typography>
        {description}
      </div>
      {/* below could be a children */}
      <div className={classes.accordion}>
        <div className={classes.headerButtons}>
          <button>Metadata</button>
          <button>Enrichment</button>
          <button>Assistant</button>
        </div>
      </div>
    </Container>
  );
}
