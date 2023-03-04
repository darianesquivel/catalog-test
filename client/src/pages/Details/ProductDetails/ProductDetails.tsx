import { Divider, Grid, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DetailTable from "../../../components/DetailTable/DetailTable";
import { useParams } from "react-router";
import getProductInfo from "../../../api/getProductInfo";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../DrawerAppbar/DrawerAppbar";
import CustomAlert from "../../../components/Alert/CustomAlert";

// STYLES
import useStyles from "./styles";

type Tproduct = {
  id: string;
  name: string;
  description: string;
  created_at?: any;
  updated_at?: any;
  image: string;
  catalog_id: string;
  images?: string[];
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
  const { setSectionInfo } = useStore((state) => state);

  const [imagesState, setImagesState] = useState<any>([]);
  const [selected, setSelected] = useState<any>(imagesState?.[0]);
  const keyValues = [
    { key: "title", value: product.name },
    {
      key: "images",
      value: imagesState?.join(", ") || "-",
    },
    { key: "mainImageUrl", value: product.image },
    { key: "description", value: product.description },
  ];

  useEffect(() => {
    setSectionInfo(product.name);
    setImagesState(product.images?.map((obj: any) => obj?.url));
    return () => setSectionInfo("");
  }, [product?.name, setSectionInfo]);

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
                  <Typography variant="caption">Product ID</Typography>
                  <Typography variant="caption">{product.id}</Typography>
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
                    <Typography variant="caption">
                      Product information
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={`${classes.details}`}>
                    <div className={classes.productTitle}>
                      <Typography variant="h6">{product.name}</Typography>
                    </div>
                    <div className={classes.productDesc}>
                      <Typography variant="body2"> Description</Typography>
                      <Typography variant="body2">
                        {product.description}
                      </Typography>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Divider className={classes.divider} />
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
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Divider className={classes.divider} />
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography variant="caption">Metadata</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>
                    <DetailTable
                      rows={keyValues}
                      extraStyles={classes.extraStyles}
                    />
                  </AccordionDetails>
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
