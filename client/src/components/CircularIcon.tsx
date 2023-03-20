import React from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, Theme } from '@material-ui/core';
import classNames from 'classnames';
const useStyles = makeStyles((theme: Theme) => {
   return {
      container: {
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         position: 'relative',
      },
      content: {
         position: 'absolute',
         zIndex: 999,
         color: 'white',
         fontSize: '10px',
         fontWeight: 'bold',
      },
      icon: {
         position: 'absolute',
      },
   };
});
type CircularProps = {
   content: any;
   extraStyles?: string;
};
export default function CircularIcon({ content, extraStyles }: CircularProps) {
   const classes = useStyles();
   return (
      <div className={classNames(classes.container, extraStyles)}>
         <span className={classes.content}>{content}</span>
         <FontAwesomeIcon
            icon={faCircle}
            className={classNames(classes.icon)}
            color="red"
            size="xl"
         />
      </div>
   );
}
