import { Divider, Grid, ImageList, ImageListItem } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DetailTable from "../../components/DetailTable";

type Tparams = {
  id: string;
  image: string;
  description: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  gridContainer: {
    background: theme.palette.background.paper,
    height: "calc(100vh - 115px)",
  },
  leftBox: {
    background: theme.palette.background.default,
    height: "100%",
  },
  rightBox: {
    // background: "pink",
    padding: theme.spacing(1, 2),
  },

  imagesContainer: {
    height: "inherit",
  },
  carousel: {
    overflow: "auto",
    height: "100%",
    width: "100%",
  },

  img: {
    cursor: "pointer",
    width: "100%",
    objectFit: "scale-down",
    maxHeight: "170px",
    paddingBottom: theme.spacing(0.5),
    "&:hover": {
      paddingBottom: theme.spacing(0),
      borderBottom: "4px solid #5A67C5",
    },
  },
  mainImgGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    background: theme.palette.background.default,
  },
  mainImage: {
    objectFit: "scale-down",
    height: "100%",
    width: "100%",
    padding: theme.spacing(0.3),
    flexGrow: 1,
  },
  accordionBox: {
    width: "100%",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2),
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  details: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2),
  },
  extraStyles: {
    gap: theme.spacing(2),
    padding: theme.spacing(0),
    gridTemplateColumns: "2fr 3fr",
  },
  productTitle: {},
}));
export default function ProductDetails({ id, description, image }: Tparams) {
  const classes = useStyles();
  const images = [1, 2, 3, 4, 5, 5, 7, 8].map((v, i) =>
    fetch("https://picsum.photos/2000/1400")
  );
  const [imagesState, setImagesState] = useState<any>([]);
  const [selected, setSelected] = useState<any>(imagesState?.[0]);
  const keyValues = [
    { key: "title", value: "Title value" },
    { key: "images", value: "url images" },
    { key: "mainImageUrl", value: "main image" },
    { key: "description", value: "description again" },
  ];

  useEffect(() => {
    Promise.all(images)
      .then((values) => {
        setImagesState(values.map((e) => e.url));
        setSelected(values[0]?.url);
      })
      .catch((er) => console.log(er));
  }, []);

  return (
    <>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={9} className={classes.leftBox}>
          <Grid container className={classes.imagesContainer}>
            <Grid item xs={2} className={classes.carousel}>
              {imagesState.map((url: any) =>
                url ? (
                  <img
                    src={url}
                    className={`${classes.img}`}
                    onClick={() => setSelected(url)}
                  />
                ) : (
                  ""
                )
              )}
            </Grid>
            <Grid item xs={10} className={classes.mainImgGrid} zeroMinWidth>
              <img src={selected} className={classes.mainImage} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.rightBox} xs={3}>
          <div className={classes.header}>
            <Typography variant="subtitle1">Products Details</Typography>
            <Typography variant="body2">
              <span>Product ID</span>
              <span>id value</span>
            </Typography>
            <Divider className={classes.divider} />
          </div>
          <div className={classes.accordionBox}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="caption">Product information</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <div className={classes.productTitle}>
                  <Typography variant="h6"> Product Title</Typography>
                </div>
                <div>
                  <Typography variant="body2"> Description</Typography>
                  <Typography variant="body2">
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion disabled>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography variant="caption">Assistant</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography variant="caption">Metadata</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                {/* {keyValues.map(({ key, value }) => (
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      {" "}
                      {key}
                    </Grid>
                    <Grid item xs={6}>
                      {" "}
                      {value}
                    </Grid>
                  </Grid>
                ))} */}
                <DetailTable
                  rows={keyValues}
                  noBold
                  extraStyles={classes.extraStyles}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
