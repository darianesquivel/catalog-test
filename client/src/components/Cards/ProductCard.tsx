import {
   Button,
   Card,
   CardActionArea,
   CardActions,
   CardContent,
   CardMedia,
   Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
   cardContainer: {
      width: 345,
      height: 300,
      borderRadius: theme.shape.borderRadius / 8,
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
}));

type TProductCard = {
   title?: string;
   brand?: string;
   image?: string;
   catalogId?: string;
   id?: string;
   onSelectionModelChange?: any;
   selected?: any;
};

export default function ProductCard({
   title,
   brand,
   image,
   catalogId,
   id,
   onSelectionModelChange,
   selected,
}: TProductCard) {
   const classes = useStyles();
   const history = useHistory();

   const handleClick = () => {
      history.push(`/catalogs/${catalogId}/${id}/details`);
   };

   return (
      <Card className={classes.cardContainer} onClick={() => onSelectionModelChange(id)}>
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
