import { Grid, ImageList, ImageListItem } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
type Tparams = {
  id: string;
  image: string;
  description: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  gridContainer: {
    background: "black",
    height: "calc(100vh - 115px)",
  },
  leftBox: {
    background: theme.palette.background.default,
    height: "100%",
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
}));
export default function ProductDetails({ id, description, image }: Tparams) {
  const classes = useStyles();
  const images = [1, 2, 3, 4, 5, 5, 7, 8].map((v, i) =>
    fetch("https://picsum.photos/2000/1400")
  );
  const [imagesState, setImagesState] = useState<any>([]);
  const [selected, setSelected] = useState<any>(imagesState?.[0]);

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
      <div>ProductDetail</div>
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
        <Grid item> Item 2</Grid>
      </Grid>
    </>
  );
}
