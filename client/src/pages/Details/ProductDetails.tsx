import { Divider, Grid, CircularProgress } from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DetailTable from "../../components/DetailTable";
import { useParams } from "react-router";
import getProductInfo from "../../api/getProductInfo";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../DrawerAppbar";
import CustomAlert from "../../components/CustomAlert";
import _ from "lodash";

// STYLES
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  gridContainer: {
    background: theme.palette.background.paper,
    height: "calc(100vh - 115px)",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: theme.spacing(1),
    flexWrap: "nowrap",
  },
  leftBox: {
    background: theme.palette.background.default,
    height: "100%",
    position: "relative",
  },
  rightBox: {
    padding: theme.spacing(1, 0.5),
    position: "relative",
    overflow: "auto",
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
    paddingBottom: theme.spacing(0.25),
    "&:hover": {
      paddingBottom: theme.spacing(0),
      borderBottom: `2px solid ${theme.palette.primary.main}`,
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
    marginBottom: theme.spacing(1),
  },
  details: {
    display: "grid",
    gridTemplateColumns: "1fr",
    padding: theme.spacing(1, 2, 2, 2),
  },
  extraStyles: {
    "& [class*='row']": {
      gap: theme.spacing(2),
    },
  },
  idBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  productTitle: {
    padding: theme.spacing(0, 0, 2, 0),
  },
  productDesc: {
    display: "grid",
    gap: theme.spacing(2),
  },
  center: {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  accordionTitle: {
    color: theme.palette.primary.main,
    "&:hover": {
      marginBottom: theme.spacing(-1 / 4),
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
  },
  icon: {
    color: theme.palette.primary.main,
  },
  accordion: {
    boxShadow: "none",
  },
}));

type Tproduct = {
  id: string;
  name: string;
  description: string;
  created_at?: any;
  updated_at?: any;
  image: string;
  catalog_id: string;
  images?: string[];
  dinamicFields?: any;
};

export default function ProductDetails() {
  const classes = useStyles();
  const { id: catalogId, productId } = useParams<{
    id: string;
    productId: string;
  }>();

  const { data, isLoading, error, isSuccess } = useQuery(
    [`productInfo/${productId}`],
    () => getProductInfo({ catalogId, productId })
  );
  const product: Tproduct = data || {};
  const extraBullets = useMemo(() => {
    if (product?.dinamicFields) {
      return Object.entries(product.dinamicFields).map(([key, value]: any) => ({
        key,
        value,
      }));
    } else return [];
  }, [product]);

  const { setSectionInfo } = useStore((state) => state);

  const [imagesState, setImagesState] = useState<any>([]);
  const [selected, setSelected] = useState<any>(imagesState?.[0]);
  const keyValues = _.uniqBy(
    [
      { key: "title", value: product.name },
      {
        key: "images",
        value: imagesState?.join(", ") || "-",
      },
      { key: "mainImageUrl", value: product.image },
      { key: "description", value: product.description },
      ...extraBullets,
    ],
    "key"
  );

  useEffect(() => {
    setSectionInfo(product.name);
    setImagesState(product.images?.map((obj: any) => obj?.url));
    return () => setSectionInfo("");
  }, [product?.name, setSectionInfo, product?.images]);

  return (
    <>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={9} className={classes.leftBox}>
          {isLoading ? (
            <CircularProgress size={28} className={classes.center} />
          ) : null}
          {isSuccess ? (
            <Grid container className={classes.imagesContainer}>
              <Grid item xs={2} className={classes.carousel}>
                {imagesState?.map((url: string) =>
                  url ? (
                    <img
                      src={url}
                      key={url}
                      alt={`${product.name}`}
                      className={`${classes.img}`}
                      onClick={() => setSelected(url)}
                    />
                  ) : (
                    ""
                  )
                )}
              </Grid>
              <Grid item xs={10} className={classes.mainImgGrid} zeroMinWidth>
                <img
                  alt={`${product.name}`}
                  src={selected || product.image}
                  className={classes.mainImage}
                />
              </Grid>
            </Grid>
          ) : null}
          {error && (
            <CustomAlert
              alertType="error"
              message={`There was an error creating the catalog: ${error}`}
            />
          )}
        </Grid>

        <Grid item className={classes.rightBox} xs={3}>
          {isLoading ? (
            <CircularProgress size={28} className={classes.center} />
          ) : null}

          {isSuccess ? (
            <>
              <div className={classes.header}>
                <Typography variant="subtitle1">Products Details</Typography>
                <Typography variant="body2" className={classes.idBox}>
                  <Typography component={"span"} variant="body2">
                    Product ID
                  </Typography>
                  <Typography variant="caption">{product.id}</Typography>
                </Typography>
                <Divider className={classes.divider} />
              </div>
              <div className={classes.accordionBox}>
                <Accordion className={classes.accordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.icon} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      className={classes.accordionTitle}
                      variant="body2"
                    >
                      Product information
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={`${classes.details}`}>
                    <div className={classes.productTitle}>
                      <Typography variant="h6">{product.name}</Typography>
                    </div>
                    <div className={classes.productDesc}>
                      <Typography variant="body1"> Description</Typography>
                      <Typography variant="body2">
                        {product.description}
                      </Typography>
                    </div>
                  </AccordionDetails>
                  <Divider className={classes.divider} />
                </Accordion>
                <Accordion disabled className={classes.accordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.icon} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography
                      className={classes.accordionTitle}
                      variant="body2"
                    >
                      Assistant
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">No data</Typography>
                  </AccordionDetails>
                  <Divider className={classes.divider} />
                </Accordion>

                <Accordion className={classes.accordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.icon} />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography
                      className={classes.accordionTitle}
                      variant="body2"
                    >
                      Metadata
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails className={classes.details}>
                    <DetailTable
                      rows={keyValues}
                      extraStyles={classes.extraStyles}
                    />
                  </AccordionDetails>
                  <Divider className={classes.divider} />
                </Accordion>
              </div>
            </>
          ) : error ? (
            <CustomAlert
              alertType="error"
              message={`There was an error creating the catalog: ${error}`}
            />
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}
