import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import ClassNames from 'classnames';
import { Checkbox } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   cardContainer: {
      width: '350px',
      height: 300,
      borderRadius: theme.shape.borderRadius / 8,
      border: `2px solid rgba(0,0,0,0)`,
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
   actionArea: {},
   cardContent: {
      height: 100,
   },
   checkbox: {
      position: 'absolute',
      zIndex: 1000,
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
   const handleClick = () => {
      history.push(`/catalogs/${catalogId}/${id}/details`);
   };
   return (
      <Card
         className={ClassNames(classes.cardContainer, {
            [classes.cardContainerSelected]: isSelected,
         })}
      >
         <Checkbox
            checked={isSelected}
            color="primary"
            className={classes.checkbox}
            onClick={() => onSelectionChange(id)}
         />

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
               <Typography gutterBottom variant="body2" component="h2">
                  {brand}
               </Typography>
               <Typography variant="caption" color="textSecondary" component="p">
                  {title}
               </Typography>
            </CardContent>
         </CardActionArea>
      </Card>
   );
}

export default memo(ProductCard);
