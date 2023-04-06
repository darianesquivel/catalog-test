import React from 'react';

import { CardContent, Typography, Card, CardHeader, CardMedia } from '@material-ui/core';
import { faCartPlus, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

// STYLES
import { makeStyles, createStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import CatalogOptions from './CatalogOptions';

const useStyles = makeStyles((theme) =>
   createStyles({
      root: {
         '& .MuiCardContent-root': {
            paddingBottom: theme.spacing(1.5),
         },
      },
      catalogCard: {
         height: 355,
         borderRadius: theme.shape.borderRadius,
      },
      cardContainer: {
         width: '100%',
         height: '100%',
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'space-between',
         padding: theme.spacing(0),
      },
      media: {
         height: 300,
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         color: theme.palette.primary.main,
         gap: theme.spacing(1),
         cursor: 'pointer',
      },
      typography: {
         fontWeight: 200,
      },
      products: {
         color: theme.palette.primary.main,
         marginBottom: theme.spacing(1),
         cursor: 'pointer',
         fontWeight: 600,
      },
      createdAt: {
         display: 'flex',
         alignItems: 'center',
         color: theme.palette.text.secondary,
         fontSize: '14px',
         gap: theme.spacing(1),
         letterSpacing: '0.02em',
      },
      alertStyle: {
         backgroundColor: theme.palette.primary.light,
         color: `${theme.palette.primary.main} !important`,
         '& .MuiAlert-icon': {
            color: theme.palette.primary.main,
         },
      },
   })
);

type TcatalogCard = {
   id: string;
   name: string;
   products?: any;
   createdAt?: string;
   image?: string;
   productCount: number;
};

export default function CatalogCard({ id, name, products, createdAt, productCount }: TcatalogCard) {
   const classes = useStyles();

   const history = useHistory();

   const date = createdAt ? new Date(createdAt).toLocaleString() : 'no date';
   const defaultImage = products?.[0]?.image;

   return (
      <>
         <Card className={classNames(classes.catalogCard, classes.root)}>
            <CardContent className={classes.cardContainer}>
               <CardHeader
                  action={<CatalogOptions id={id} name={name} />}
                  title={name ? name : 'Default'}
                  titleTypographyProps={{ variant: 'body2' }}
               />

               {productCount < 1 ? (
                  <CardMedia
                     onClick={() => history.push(`/catalogs/${id}/upload`)}
                     className={classes.media}
                     children={
                        <>
                           <FontAwesomeIcon size="2xl" icon={faCartPlus} />
                           <Typography variant="body2" className={classes.typography}>
                              Add Products
                           </Typography>
                        </>
                     }
                  ></CardMedia>
               ) : (
                  defaultImage && (
                     <CardMedia
                        className={classes.media}
                        onClick={() => history.push(`/catalogs/${id}`)}
                        image={defaultImage}
                     />
                  )
               )}
               <CardContent>
                  <Typography
                     variant="body2"
                     className={classes.products}
                     onClick={() => history.push(`/catalogs/${id}`)}
                  >{`${productCount} products`}</Typography>
                  <Typography className={classes.createdAt} variant="body2">
                     <FontAwesomeIcon size="1x" icon={faCalendarDay} />
                     {`Created: ${date}`}
                  </Typography>
               </CardContent>
            </CardContent>
         </Card>
      </>
   );
}
