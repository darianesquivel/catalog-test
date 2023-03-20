import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { uniq } from 'lodash';
import moment from 'moment';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme: Theme) => ({
   timestamp: {
      color: theme.palette.grey[500],
      fontSize: '14px',
      gap: theme.spacing(1),
      letterSpacing: '0.04em',
   },
   defaultMessage: {
      display: 'flex',
      justifyContent: 'flex-start',
      padding: theme.spacing(1, 2),
      alignItems: 'center',
      gap: theme.spacing(2),
      color: theme.palette.grey[600],
   },
   accDetails: {
      padding: theme.spacing(1),
      cursor: 'pointer',
      '&:hover': {
         backgroundColor: theme.palette.grey[100],
      },
      width: '100%',
   },
}));

type NotificationParams = {
   filter: 'pending' | 'previous';
   notifications: any[];
   viewTracker?: (value: any) => void;
};

export default function NotificationsAccordion({
   filter,
   notifications,
   viewTracker,
}: NotificationParams) {
   const classes = useStyles();

   const defaultMessage = (
      <div className={classes.defaultMessage}>
         <FontAwesomeIcon icon={faBellSlash} />
         <Typography>No {filter} notifications</Typography>
      </div>
   );

   let finalNotifications: any;

   if (filter === 'previous') {
      finalNotifications = notifications.filter((notif: any) => !notif?.pending);
   } else {
      finalNotifications = notifications.filter((notif: any) => notif?.pending);
   }
   if (!finalNotifications.length) {
      return defaultMessage;
   }

   const handleClick = (timestamp: string) => {
      if (viewTracker) {
         viewTracker((prev: any) => {
            return uniq([...prev, timestamp]);
         });
      }
   };
   console.log({ beforeAccordion: 'eeee' });
   const accordions = finalNotifications.map(({ title, content, timestamp }: any) => (
      <Accordion key={timestamp}>
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
         >
            {title}
         </AccordionSummary>
         <AccordionDetails onClick={() => handleClick(timestamp)}>
            <div className={classes.accDetails}>
               {content}
               <Typography className={classes.timestamp} variant="body2">
                  {moment(timestamp).fromNow()}
               </Typography>
            </div>
         </AccordionDetails>
      </Accordion>
   ));
   return accordions;
}
