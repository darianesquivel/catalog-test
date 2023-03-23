import { Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
   container: {
      width: '100%',
      height: 'calc(100vh - 145px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
   },
   divider: {
      height: '80px',
   },
   message: {
      display: 'flex',
      flexDirection: 'column',
   },
}));

type TNotFoundProps = {
   error?: any;
   info?: string;
};

export default function NotFound({ error, info }: TNotFoundProps) {
   const classes = useStyles();

   return (
      <div className={classes.container}>
         <Typography variant="h5">
            {!error ? '404' : error?.response?.status ? error?.response?.status : error?.code}
         </Typography>
         <Divider orientation="vertical" className={classes.divider} />
         <div className={classes.message}>
            <Typography variant="body2">{info ? info : 'This page could not be found'}</Typography>
            {error?.message ? <Typography variant="caption">{error?.message}</Typography> : null}
            {error?.response?.statusText ? (
               <Typography variant="caption"> {error?.response?.statusText} </Typography>
            ) : null}
         </div>
      </div>
   );
}
