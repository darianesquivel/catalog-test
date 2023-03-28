import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Divider, Grid, CircularProgress, Checkbox } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import { AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DetailTable from '../../components/DetailTable';
import _, { before, upperFirst } from 'lodash';

// STYLES
import { makeStyles, Theme } from '@material-ui/core/styles';
import CustomNavBar from '../../components/CustomNavBar';
import { useProductInfoQuery } from '../../config/queries';
import toHex from 'colornames';
import NotFound from '../NotFound';

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      '&.MuiAccordion-root:before': {
         backgroundColor: 'transparent',
      },
      '&.MuiAccordionSummary-root': {
         paddingLeft: theme.spacing(0),
      },
      '&.MuiAccordionSummary-content': {},
      '&.MuiAccordionDetails-root': {
         padding: theme.spacing(0),
      },
   },
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
      borderRadius: theme.shape.borderRadius,
      marginTop: theme.spacing(0.5),
   },
   size: {
      display: 'inline-block',
      padding: theme.spacing(0.5 / 2, 0.5),
      borderRadius: theme.shape.borderRadius,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main} `,
      cursor: 'pointer',
      marginTop: theme.spacing(0.5),
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
            key: upperFirst(key),
            value,
         }));
      } else return [];
   }, [product]);

   const [imagesState, setImagesState] = useState<any>([]);
   const [selected, setSelected] = useState<any>(imagesState?.[0]);
   const keyValues = _.uniqBy(
      [
         { key: 'Title', value: product.name },
         {
            key: 'Images',
            value: imagesState?.join(', ') || '-',
         },
         { key: 'MainImageUrl', value: product.image },
         { key: 'Description', value: product.description },
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
         {isLoading ? <CircularProgress size={28} className={classes.center} /> : null}
         {error || (!isLoading && !data) ? (
            <NotFound error={error} info="An error occurred while loading the details" />
         ) : null}
         {isSuccess && data ? (
            <Grid container className={classes.gridContainer}>
               <Grid item xs={9} className={classes.leftBox}>
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
               </Grid>

               <Grid item className={classes.rightBox} xs={3}>
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
                                 {product.dinamicFields?.availability === 'in stock' ? (
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
                                          {product.dinamicFields?.availability}
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
                                 {product.dinamicFields?.color ? (
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
                                 ) : null}
                                 {product.dinamicFields?.size ? (
                                    <div>
                                       <Typography variant="body2" className={classes.bold}>
                                          Size
                                       </Typography>
                                       <div className={classes.size}>
                                          <Typography>{product.dinamicFields?.size}</Typography>
                                       </div>
                                    </div>
                                 ) : null}

                                 <Accordion elevation={0} className={classes.root}>
                                    <AccordionSummary
                                       expandIcon={<ExpandMoreIcon className={classes.icon} />}
                                       aria-controls="panel1a-content"
                                       id="panel1a-header"
                                       className={classes.root}
                                    >
                                       <Typography variant="body2" className={classes.bold}>
                                          Description
                                       </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className={classes.root}>
                                       <Typography variant="caption">
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
               </Grid>
            </Grid>
         ) : null}
      </>
   );
}
