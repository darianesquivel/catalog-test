import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      imageConteinar: {
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         height: '100%',
      },
      contentBox: {
         display: 'inherit',
         flexFlow: 'column',
         alignItems: 'center',
         gap: theme.spacing(2),
         padding: theme.spacing(2),
      },
      addProductBtn: {
         borderRadius: theme.shape.borderRadius,
         textTransform: 'none',
         padding: theme.spacing(0.4, 2),
      },
      mainTyp: {
         fontSize: '16px',
      },
   })
);
type BtnProps = {
   onClick: () => any;
};

export default function NotProductsImage({ onClick }: BtnProps) {
   const classes = useStyles();
   return (
      <div className={classes.imageConteinar}>
         <div className={classes.contentBox}>
            <img
               src="https://scale-static-assets.s3.us-west-2.amazonaws.com/catalog-explorer/sadblobs+1.png"
               alt="no product found"
            />
            <Typography className={classes.mainTyp} variant="h6">
               There are no products in this catalog
            </Typography>
            <Typography variant="body2">Would you like to upload them?</Typography>
            <Button
               variant="contained"
               color="primary"
               className={classes.addProductBtn}
               onClick={onClick}
            >
               Add products
            </Button>
         </div>
      </div>
   );
}
