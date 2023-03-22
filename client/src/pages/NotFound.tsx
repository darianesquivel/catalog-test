import { Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
   container: {},
}));

export default function NotFound() {
   const classes = useStyles();
   return (
      <div>
         <Typography variant="h5">404</Typography>
         <Divider orientation="vertical" />
         <Typography variant="body2">This page could not be found</Typography>
      </div>
   );
}
