import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CustomTabs from '../components/CustomTabs';
import { useStore } from './DrawerAppbar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   AppBar,
   IconButton,
   Toolbar,
   Typography,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { uniq } from 'lodash';

const useStyles = makeStyles((theme: Theme) => ({
   mainBox: {
      position: 'relative',
   },
   tabContainer: {
      height: '99vh',
      width: '400px',
      overflow: 'hidden',
   },
   header: {
      position: 'relative',
      background: 'inherit',
      color: theme.palette.text.primary,
   },
   toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 2),
   },
}));
type FilterParam = 'pending' | 'previous';

const getNotificationsAccordion = (
   filter: FilterParam,
   notifications: any[],
   viewTracker?: (value: any) => void
) => {
   if (!notifications?.length) return null;
   let finalNotifications: any;

   if (filter === 'previous') {
      finalNotifications = notifications.filter(({ pending }: any) => !pending);
   } else {
      finalNotifications = notifications.filter(({ pending }: any) => pending);
   }
   const handleClick = (timestamp: string) => {
      if (viewTracker) {
         viewTracker((prev: any) => {
            return uniq([...prev, timestamp]);
         });
      }
   };

   const accordions = finalNotifications.map(({ title, content, timestamp }: any) => (
      <Accordion>
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
         >
            {title}
         </AccordionSummary>
         <AccordionDetails onClick={() => handleClick(timestamp)}>{content}</AccordionDetails>
      </Accordion>
   ));
   return accordions;
};

export default function NotificationBar({ isOpen, onToggle }: any) {
   const classes = useStyles();
   const [viewedNotifications, setWiewedNotifications] = useState([]);
   console.log({ viewedNotifications });
   const { notifications } = useStore((state: any) => ({
      notifications: state.notifications,
   }));
   const { clearPendingNotifications, updateNotificationsStatus } = useStore();

   const tabs = useMemo(
      () => [
         {
            columnName: 'Pending',
            content: getNotificationsAccordion('pending', notifications, setWiewedNotifications),
         },
         {
            columnName: 'Previous',
            content: getNotificationsAccordion('previous', notifications),
         },
      ],
      [notifications]
   );

   const toggleBar = (op: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
         event.type === 'keydown' &&
         ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
      ) {
         return;
      }
      onToggle(false);
   };

   useEffect(() => {
      updateNotificationsStatus(viewedNotifications);
      setWiewedNotifications([]);
   }, [isOpen]);
   console.log({ notifications });
   return (
      <div className={classes.mainBox}>
         <Drawer anchor={'left'} open={isOpen} onClose={toggleBar(false)}>
            <AppBar className={classes.header} position="relative">
               <Toolbar disableGutters={true} className={classes.toolbar}>
                  <Typography variant="h6">Notifications</Typography>
                  <IconButton onClick={clearPendingNotifications}>
                     <FontAwesomeIcon icon={faTrash} color="gray" size="sm" />
                  </IconButton>
               </Toolbar>
            </AppBar>
            <CustomTabs tabValues={tabs} extraStyles={classes.tabContainer} />
         </Drawer>
      </div>
   );
}
