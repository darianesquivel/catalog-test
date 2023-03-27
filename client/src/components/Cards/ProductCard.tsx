import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { memo, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import ClassNames from 'classnames';
import { Checkbox } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   cardContainer: {
      height: 300,
      borderRadius: theme.shape.borderRadius,
      border: `2px solid ${theme.palette.background.paper}`,
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
      position: 'absolute',
      zIndex: 1000,
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
   isSelected = false,
}: TProductCard) {
   const classes = useStyles();
   const history = useHistory();
   const handleClick = useCallback(() => {
      history.push(`/catalogs/${catalogId}/${id}/details`);
   }, [catalogId, history, id]);

   const RenderCardContent = useMemo(() => {
      console.log('CARD');
      return (
         <CardActionArea>
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
   }, [brand, image, title, classes, handleClick]);

   const RenderCheckBox = useMemo(
      () => (
         <Checkbox
            checked={isSelected}
            color="primary"
            className={classes.checkbox}
            onClick={() => onSelectionChange(id)}
            icon={<span className={classes.icon} />}
         />
      ),
      [classes.checkbox, classes.icon, id, isSelected, onSelectionChange]
   );

   return (
      <Card
         className={ClassNames(classes.cardContainer, {
            [classes.cardContainerSelected]: isSelected,
         })}
      >
         {RenderCheckBox}
         {RenderCardContent}
      </Card>
   );
}

export default memo(ProductCard);
