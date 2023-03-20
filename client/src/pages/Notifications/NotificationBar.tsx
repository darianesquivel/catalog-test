import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CustomTabs from '../../components/CustomTabs';
import { useStore } from '../DrawerAppbar';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import NotificationsAccordion from './NotificationsAccordion';

const useStyles = makeStyles((theme: Theme) => ({
   mainBox: {
      position: 'relative',
   },
   tabContainer: {
      height: '99vh',
      width: '400px',
      overflowY: 'auto',
      '& [role="tablist"]': {
         display: 'flex',
         justifyContent: 'space-evenly',
      },
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

export default function NotificationBar({ isOpen, onToggle }: any) {
   const classes = useStyles();
   const [viewedNotifications, setWiewedNotifications] = useState([]);
   console.log({ viewedNotifications });
   const { notifications } = useStore((state: any) => ({
      notifications: state.notifications,
   }));
   const hasPending = useMemo(
      () => notifications.some(({ pending }: any) => !!pending),
      [notifications]
   );

   const { clearPendingNotifications, updateNotificationsStatus } = useStore();

   const tabs = useMemo(
      () => [
         {
            columnName: 'Pending',
            content: (
               <NotificationsAccordion
                  filter="pending"
                  notifications={notifications}
                  viewTracker={setWiewedNotifications}
               />
            ),
         },
         {
            columnName: 'Previous',
            content: <NotificationsAccordion filter="previous" notifications={notifications} />,
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

   return (
      <div className={classes.mainBox}>
         <Drawer anchor={'left'} open={isOpen} onClose={toggleBar(false)}>
            <AppBar className={classes.header} position="relative">
               <Toolbar disableGutters={true} className={classes.toolbar}>
                  <Typography variant="h6">Notifications</Typography>
                  <IconButton onClick={clearPendingNotifications} disabled={!hasPending}>
                     <FontAwesomeIcon icon={faTrash} color="gray" size="sm" />
                  </IconButton>
               </Toolbar>
            </AppBar>
            <CustomTabs tabValues={tabs} extraStyles={classes.tabContainer} />
         </Drawer>
      </div>
   );
}
