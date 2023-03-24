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
   root: {
      width: 345,
      borderRadius: theme.shape.borderRadius / 8,
   },
   productImg: {
      borderBottom: `2px solid ${theme.palette.background.paper}`,
      '&:hover': {
         borderBottom: `2px solid ${theme.palette.primary.main}`,
      },
   },
}));

type TProductCard = {
   title?: string;
   brand?: string;
   image?: string;
   catalogId?: string;
   id?: string;
};

export default function ProductCard({ title, brand, image, catalogId, id }: TProductCard) {
   const classes = useStyles();
   const history = useHistory();

   const handleClick = () => {
      history.push(`/catalogs/${catalogId}/${id}/details`);
   };

   return (
      <Card className={classes.root}>
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
            <CardContent>
               <Typography gutterBottom variant="body1" component="h2">
                  {brand}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
                  {title}
               </Typography>
            </CardContent>
         </CardActionArea>
      </Card>
   );
}
