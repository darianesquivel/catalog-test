import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { uniq } from 'lodash';
import moment from 'moment';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router';

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
      color: theme.palette.text.secondary,
   },
   accDetails: {
      width: '100%',
      padding: theme.spacing(1),
      cursor: 'pointer',
      borderRadius: '8px',
      '&:hover': {
         backgroundColor: theme.palette.background.default,
      },
   },
}));

type NotificationParams = {
   filter: 'pending' | 'previous';
   notifications: any[];
   viewTracker?: (value: any) => void;
   onToggle?: (op: boolean) => void;
};

export default function NotificationsAccordion({
   filter,
   notifications,
   viewTracker,
   onToggle,
}: NotificationParams) {
   const classes = useStyles();
   const history = useHistory();
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

   const handleClick = (timestamp: string, response: any) => {
      const { data, action } = response;

      if (viewTracker) {
         viewTracker((prev: any) => {
            return uniq([...prev, timestamp]);
         });
      }
      if (!action.includes('Remove')) {
         history.push(`/catalogs/${data.id}`);
      }
      onToggle?.(false);
   };

   const accordions = finalNotifications.map(({ title, content, timestamp }: any) => (
      <Accordion key={timestamp}>
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
         >
            {title}
         </AccordionSummary>
         <AccordionDetails onClick={() => handleClick(timestamp, content)}>
            <div className={classes.accDetails}>
               {content.message}
               <Typography className={classes.timestamp} variant="body2">
                  {moment(timestamp).fromNow()}
               </Typography>
            </div>
         </AccordionDetails>
      </Accordion>
   ));
   return accordions;
}
