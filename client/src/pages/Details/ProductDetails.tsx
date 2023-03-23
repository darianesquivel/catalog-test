import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Divider, Grid, CircularProgress, Checkbox } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import { AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DetailTable from '../../components/DetailTable';
import CustomAlert from '../../components/CustomAlert';
import _ from 'lodash';

// STYLES
import { makeStyles, Theme } from '@material-ui/core/styles';
import CustomNavBar from '../../components/CustomNavBar';
import { useProductInfoQuery } from '../../config/queries';
import toHex from 'colornames';

const useStyles = makeStyles((theme: Theme) => ({
   gridContainer: {
      background: theme.palette.background.paper,
      height: 'calc(100vh - 115px)',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      gap: theme.spacing(1),
      flexWrap: 'nowrap',
   },
   leftBox: {
      background: theme.palette.background.default,
      height: '100%',
      position: 'relative',
   },
   rightBox: {
      padding: theme.spacing(2),
      position: 'relative',
      overflow: 'auto',
   },

   imagesContainer: {
      height: 'inherit',
   },
   carousel: {
      overflow: 'auto',
      height: '100%',
      width: '100%',
   },

   img: {
      cursor: 'pointer',
      width: '100%',
      objectFit: 'scale-down',
      maxHeight: '170px',
      paddingBottom: theme.spacing(0.25),
      '&:hover': {
         paddingBottom: theme.spacing(0),
         borderBottom: `2px solid ${theme.palette.primary.main}`,
      },
   },
   mainImgGrid: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      background: theme.palette.background.default,
   },
   mainImage: {
      objectFit: 'scale-down',
      height: '100%',
      width: '100%',
      padding: theme.spacing(0.3),
      flexGrow: 1,
   },
   accordionBox: {
      width: '100%',
   },
   header: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: theme.spacing(2),
   },
   divider: {
      marginBottom: theme.spacing(1),
   },
   details: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      padding: theme.spacing(1, 2, 2, 2),
   },
   extraStyles: {
      '& > div': {
         gap: theme.spacing(2),
      },
   },
   idBox: {
      display: 'flex',
      justifyContent: 'space-between',
   },
   productTitle: {
      padding: theme.spacing(0, 0, 2, 0),
   },
   productDesc: {
      display: 'grid',
      gap: theme.spacing(2),
   },
   center: {
      display: 'block',
      position: 'absolute',
      top: '50%',
      left: '50%',
   },
   accordionTitle: {
      color: theme.palette.primary.main,
      fontWeight: 500,

      '&:hover': {
         marginBottom: theme.spacing(-1 / 4),
         borderBottom: `2px solid ${theme.palette.primary.main}`,
      },
   },
   icon: {
      color: theme.palette.primary.main,
   },
   accordion: {
      boxShadow: 'none',
   },
   color: {
      padding: theme.spacing(1.2, 0),
      width: '40px',
      boxShadow: '0 0 0 2px #cccccc',
      border: '2px solid #F8F8F8',
      cursor: 'pointer',
      borderRadius: theme.shape.borderRadius / 8,
   },
   size: {
      display: 'inline-block',
      width: 'auto',
      padding: theme.spacing(1 / 2, 1),
      borderRadius: theme.shape.borderRadius,
      border: `2px solid ${theme.palette.primary.main}`,
      cursor: 'pointer',
   },
   stock: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
   },
   hideBorder: {
      '&.MuiExpansionPanel-root:before': {
         display: 'none',
      },
   },
   outOfStock: {
      color: theme.palette.error.main,
   },
   bold: {
      fontWeight: 500,
   },
   checkbox: {
      padding: theme.spacing(0),
      marginRight: theme.spacing(1 / 4),
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

   const { data, isLoading, error, isSuccess } = useProductInfoQuery(catalogId, productId, [
      `productInfo/${productId}`,
   ]);

   const product: Tproduct = useMemo(() => data || {}, [data]);
   const extraBullets = useMemo(() => {
      if (product?.dinamicFields) {
         return Object.entries(product.dinamicFields).map(([key, value]: any) => ({
            key,
            value,
         }));
      } else return [];
   }, [product]);

   const [imagesState, setImagesState] = useState<any>([]);
   const [selected, setSelected] = useState<any>(imagesState?.[0]);
   const keyValues = _.uniqBy(
      [
         { key: 'title', value: product.name },
         {
            key: 'images',
            value: imagesState?.join(', ') || '-',
         },
         { key: 'mainImageUrl', value: product.image },
         { key: 'description', value: product.description },
         ...extraBullets,
      ],
      'key'
   );

   useEffect(() => {
      setImagesState(product.images?.map((obj: any) => obj?.url));
   }, [product?.name, product?.images]);

   return (
      <>
         <CustomNavBar
            isProductDetails
            title={product.name}
            catalogId={product.catalog_id}
            productId={product.id}
         />
         <Grid container className={classes.gridContainer}>
            <Grid item xs={9} className={classes.leftBox}>
               {isLoading ? <CircularProgress size={28} className={classes.center} /> : null}
               {isSuccess ? (
                  <Grid container className={classes.imagesContainer}>
                     <Grid item xs={2} className={classes.carousel}>
                        {imagesState?.map((url: string) =>
                           url ? (
                              <img
                                 src={url}
                                 key={url}
                                 alt={`${product.name}`}
                                 className={classes.img}
                                 onClick={() => setSelected(url)}
                              />
                           ) : (
                              ''
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
               {isLoading ? <CircularProgress size={28} className={classes.center} /> : null}
               {isSuccess ? (
                  <>
                     <div className={classes.header}>
                        <Typography variant="subtitle1" className={classes.bold}>
                           Products Details
                        </Typography>
                        <Typography variant="body2" className={classes.idBox}>
                           <Typography component={'span'} variant="body2" className={classes.bold}>
                              Product ID
                           </Typography>
                           <Typography variant="caption">{product.id}</Typography>
                        </Typography>
                        <Divider className={classes.divider} />
                     </div>
                     <div className={classes.accordionBox}>
                        <Accordion defaultExpanded className={classes.accordion}>
                           <AccordionSummary
                              expandIcon={<ExpandMoreIcon className={classes.icon} />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                           >
                              <Typography className={classes.accordionTitle} variant="body2">
                                 Product information
                              </Typography>
                           </AccordionSummary>
                           <AccordionDetails className={classes.details}>
                              <div className={classes.productTitle}>
                                 <Typography variant="h5" className={classes.bold}>
                                    {product.name}
                                 </Typography>
                              </div>
                              <div className={classes.productDesc}>
                                 {product.dinamicFields?.Availability === 'in stock' ? (
                                    <div className={classes.stock}>
                                       <Checkbox
                                          size="small"
                                          checked={true}
                                          color="primary"
                                          className={classes.checkbox}
                                       />
                                       <Typography
                                          variant="caption"
                                          color="primary"
                                          className={classes.bold}
                                       >
                                          {product.dinamicFields?.Availability}
                                       </Typography>
                                    </div>
                                 ) : (
                                    <Typography
                                       color="error"
                                       variant="caption"
                                       className={classes.bold}
                                    >
                                       {product.dinamicFields?.Availability}
                                    </Typography>
                                 )}
                                 <div>
                                    <Typography variant="body2" className={classes.bold}>
                                       Colors
                                    </Typography>
                                    <div
                                       className={classes.color}
                                       style={{
                                          background: `${toHex(product.dinamicFields?.color)}`,
                                       }}
                                    ></div>
                                 </div>
                                 <div>
                                    <Typography variant="body2" className={classes.bold}>
                                       Size
                                    </Typography>
                                    <div className={classes.size}>
                                       <Typography>{product.dinamicFields?.size}</Typography>
                                    </div>
                                 </div>
                                 <Accordion className={classes.accordion}>
                                    <AccordionSummary
                                       expandIcon={<ExpandMoreIcon className={classes.icon} />}
                                       aria-controls="panel1a-content"
                                       id="panel1a-header"
                                    >
                                       <Typography variant="body2" className={classes.bold}>
                                          Description{' '}
                                       </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <Typography variant="body2">
                                          {product.description}
                                       </Typography>
                                    </AccordionDetails>
                                 </Accordion>
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
                              <Typography className={classes.accordionTitle} variant="body2">
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
                              <Typography className={classes.accordionTitle} variant="body2">
                                 Metadata
                              </Typography>
                           </AccordionSummary>

                           <AccordionDetails className={classes.details}>
                              <DetailTable rows={keyValues} extraStyles={classes.extraStyles} />
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
