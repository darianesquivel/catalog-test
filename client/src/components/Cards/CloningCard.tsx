import React from 'react';

import { CardContent, Typography, Card, CardHeader } from '@material-ui/core';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// STYLES
import { makeStyles, createStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme) =>
   createStyles({
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

      typography: {
         fontWeight: 200,
      },

      alertStyle: {
         backgroundColor: theme.palette.primary.light,
         color: `${theme.palette.primary.main} !important`,
         '& .MuiAlert-icon': {
            color: theme.palette.primary.main,
         },
      },
      icons: {
         fontSize: theme.spacing(3.6),
         color: theme.palette.primary.main,
      },
      centerContent: {
         display: 'flex',
         flexFlow: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         gap: theme.spacing(1),
         height: '100%',
         marginBottom: theme.spacing(3),
      },
      rotate: {
         animation: '$spin 2s linear infinite',
      },
      '@keyframes spin': {
         '0%': {
            transform: 'rotate(0deg)',
         },
         '100%': {
            transform: 'rotate(360deg)',
         },
      },
      mainDialogBox: {
         '& .MuiDialogContent-root': {
            padding: '0',
         },
      },
   })
);
interface CardProps {
   catalogId: string;
   title: string;
}

export default function CloningCard({ title }: CardProps) {
   const classes = useStyles();

   return (
      <>
         <Card className={classNames(classes.catalogCard)}>
            <CardContent className={classes.cardContainer}>
               <CardHeader title={`${title} (copy)`} titleTypographyProps={{ variant: 'body2' }} />
               <CardContent className={classes.centerContent}>
                  <FontAwesomeIcon
                     icon={faRedo}
                     size="lg"
                     className={classNames(classes.icons, classes.rotate)}
                     color="primary"
                  />
                  <Typography variant="body2" color="primary">
                     Duplicating Catalog...
                  </Typography>
               </CardContent>
            </CardContent>
         </Card>
      </>
   );
}
