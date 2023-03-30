import {
   Card,
   CardActionArea,
   CardContent,
   CardMedia,
   Checkbox,
   Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { memo, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import ClassNames from 'classnames';

const useStyles = makeStyles((theme) => ({
   cardContainer: {
      height: 300,
      borderRadius: theme.shape.borderRadius,
      border: `2px solid ${theme.palette.background.paper}`,
   },
   cardActionArea: {
      '&:hover': {
         '& > span': {
            display: 'block',
         },
      },
   },
   cardActionAreaSelected: {
      '& > span': {
         display: 'block',
      },
   },
   cardContainerSelected: {
      border: `2px solid ${theme.palette.primary.main}`,
      zIndex: 1000,
   },
   productImg: {
      borderBottom: `2px solid ${theme.palette.background.paper}`,
      height: 200,
      '&:hover': {
         borderBottom: `2px solid ${theme.palette.primary.main}`,
      },
   },
   cardContent: {
      height: 100,
   },
   checkbox: {
      display: 'none',
      position: 'absolute',
      zIndex: 5000,
   },
   icon: {
      borderRadius: theme.shape.borderRadius / 4,
      width: 19,
      height: 19,
      border: `1px solid ${theme.palette.grey[300]}`,
      backgroundColor: '#f5f8fa',
      margin: '2px',
   },
   brand: {
      background: theme.palette.primary.main,
      display: 'inline-block',
      padding: theme.spacing(0.3, 1),
      borderRadius: theme.shape.borderRadius * 2,
      color: 'white',
      fontWeight: 500,
   },
}));

type TProductCard = {
   title?: string;
   brand?: string;
   image?: string;
   catalogId?: string;
   id?: string;
   onSelectionChange?: any;
   isSelected: boolean;
};

function ProductCard({
   title,
   brand,
   image,
   catalogId,
   id,
   onSelectionChange,
   isSelected,
}: TProductCard) {
   const classes = useStyles();
   const history = useHistory();
   const handleClick = useCallback(() => {
      history.push(`/catalogs/${catalogId}/${id}/details`);
   }, [catalogId, history, id]);

   const RenderCardContent = useMemo(() => {
      return (
         <CardActionArea
            className={ClassNames(classes.cardActionArea, {
               [classes.cardActionAreaSelected]: isSelected,
            })}
         >
            <Checkbox
               className={classes.checkbox}
               color="primary"
               checked={isSelected}
               icon={<span className={classes.icon} />}
            />
            <CardMedia
               component="img"
               alt="Contemplative Reptile"
               height="140"
               image={image}
               title="Contemplative Reptile"
               onClick={handleClick}
               className={classes.productImg}
            />

            <CardContent className={classes.cardContent}>
               <Typography className={classes.brand} gutterBottom variant="body2" component="h2">
                  {brand}
               </Typography>
               <Typography variant="caption" color="textSecondary" component="p">
                  {title}
               </Typography>
            </CardContent>
         </CardActionArea>
      );
   }, [brand, image, title, classes, handleClick, isSelected]);

   return (
      <Card
         onClick={() => onSelectionChange(id)}
         className={ClassNames(classes.cardContainer, {
            [classes.cardContainerSelected]: isSelected,
         })}
      >
         {RenderCardContent}
      </Card>
   );
}

export default memo(ProductCard);
