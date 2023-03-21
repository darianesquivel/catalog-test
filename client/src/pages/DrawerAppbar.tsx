import clsx from 'clsx';
import { Drawer, List, Typography, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import {
   faDatabase,
   faTags,
   faCogs,
   faPenNib,
   faChevronRight,
   faChevronLeft,
   faBell,
   faMoon,
   faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import queryClientConfig from '../config/queryClientConfig';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { shallow } from 'zustand/shallow';
import React, { useMemo, useState } from 'react';
import NotificationBar from './Notifications/NotificationBar';
import CircularIcon from '../components/CircularIcon';

const drawerWidth = 240;
const drawerWidthMin = 70;

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         display: 'flex',
         '& .Mui-selected': {
            backgroundColor: theme.palette.primary.light,
         },
      },
      appBar: {
         boxShadow: 'none',
         borderBottom: `${theme.spacing(1) / 8}px solid ${theme.palette.action.focus}`,
         zIndex: theme.zIndex.drawer - 1,
         width: `calc(100% - ${drawerWidthMin}px)`,
         transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
         }),
         backgroundColor: theme.palette.background.paper,
         color: theme.palette.getContrastText(theme.palette.background.paper),
      },
      appBarShift: {
         marginLeft: drawerWidth,
         width: `calc(100% - ${drawerWidth}px)`,
         transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
         }),
      },
      hide: {
         display: 'none',
      },
      drawer: {
         width: drawerWidth,
         flexShrink: 0,
         whiteSpace: 'nowrap',
      },
      drawerOpen: {
         width: drawerWidth,
         overflow: 'hidden',
         transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
         }),
      },
      drawerClose: {
         transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
         }),
         overflowX: 'hidden',
         width: drawerWidthMin + 1,
      },
      toolbar: {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'flex-end',
         padding: theme.spacing(0, 1),
         // necessary for content to be below app bar
         ...theme.mixins.toolbar,
      },
      content: {
         flexGrow: 1,
         padding: theme.spacing(2),
         minHeight: '100vh',
      },
      buttonList: {
         height: '100vh',
         display: 'flex',
         flexDirection: 'column',
         padding: theme.spacing(1, 1),
      },
      buttonStyle: {
         borderRadius: theme.shape.borderRadius,
         marginBottom: theme.spacing(1),
         color: theme.palette.grey[600],
      },
      buttonStyleSelected: {
         color: theme.palette.primary.main,
         borderRadius: theme.shape.borderRadius,
         marginBottom: theme.spacing(1),
         backgroundColor: `${theme.palette.primary.light} !important`,
      },
      iconSelected: {
         color: theme.palette.primary.main,
      },
      textButton: {
         letterSpacing: '0.04em',
      },
      drawerHeader: {
         borderRadius: theme.shape.borderRadius,
         marginBottom: theme.spacing(1),
      },
      drawerTitle: {
         fontSize: '18px',
         letterSpacing: '0.04em',
      },
      flexGrow: {
         flexGrow: 1,
      },
      link: {
         color: theme.palette.text.primary,
         textDecoration: 'none',
      },
      bellContainer: {
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         position: 'relative',
      },
      circularIcon: {
         position: 'absolute',
         top: 0,
         right: 0,
      },
   })
);

type NotificationType = {
   timestamp?: string;
   type: 'Upload' | 'Delete' | 'Duplicate' | 'Update' | 'Remove' | 'Create';
   content?: string;
   pending?: boolean;
};
const drawerButtons = [
   {
      text: 'Data Explorer',
      icon: faDatabase,
      link: '/catalogs',
   },
   {
      text: 'Enrichment',
      icon: faTags,
      link: '',
   },
   {
      text: 'Matching AI',
      icon: faCogs,
      link: '',
   },
   {
      text: 'Scribe Voices',
      icon: faPenNib,
      link: '',
   },
];

const partialValues = ['currentUrl', 'sectionInfo', 'searchingData', 'notifications'];
// zustand global state
export const useStore = create(
   persist(
      (set: any) => ({
         currentUrl: window.location.href,
         setCurrentUrl: (newValue: string) =>
            set((state: any) => ({ ...state, currentUrl: newValue })),
         open: false,
         setOpen: () => set((state: any) => ({ ...state, open: !state.open })),
         mode: 'light',
         toggleMode: () =>
            set((state: any) => ({
               ...state,
               mode: state.mode === 'light' ? 'dark' : 'light',
            })),
         notifications: [] as NotificationType[],
         setNotifications: ({ type, content, timestamp, pending = true }: NotificationType) => {
            let modelName: string;

            if (['Upload', 'Delete'].includes(type)) {
               modelName = 'products';
            } else {
               modelName = 'catalogs';
            }
            let title = `${type} ${modelName} - Completed`;
            set((state: any) => ({
               ...state,
               notifications: [{ title, content, timestamp, pending }, ...state.notifications],
            }));
         },

         clearPendingNotifications: () => {
            set((state: any) => {
               return {
                  ...state,
                  notifications: state.notifications.map((singleNot: any) => ({
                     ...singleNot,
                     pending: false,
                  })),
               };
            });
         },
         updateNotificationsStatus: (viewedNotifications: string[]) => {
            set((state: any) => ({
               ...state,
               notifications: state.notifications.map((singleNot: any) => {
                  if (viewedNotifications.includes(singleNot.timestamp)) {
                     return { ...singleNot, pending: false };
                  } else {
                     return singleNot;
                  }
               }),
            }));
         },

         searchingData: { isSearching: false },
         setSearchingData: (data: any) =>
            set((state: any) => ({ ...state, searchingData: { ...data } })),
         selectedIndex: null,
         setSelectedIndex: (index: any) =>
            set((state: any) => ({
               selectedIndex: (state.selectedIndex = index),
            })),
      }),
      {
         name: 'drawer-storage',
         getStorage: () => localStorage,
         partialize: (state) => {
            return Object.fromEntries(
               Object.entries(state).filter(([key]) => !partialValues.includes(key))
            );
         },
      }
   )
);

export default function MiniDrawer() {
   const classes = useStyles();
   const [openNotifications, setOpenNotifications] = useState(false);
   const { open, selectedIndex, mode, notifications } = useStore(
      (state: any) => ({
         open: state.open,
         mode: state.mode,
         selectedIndex: state.selectedIndex,
         notifications: state.notifications,
      }),
      shallow
   );
   const { setOpen, toggleMode, setSelectedIndex } = useStore();

   const pendingNotAmount = useMemo(
      () => notifications.filter(({ pending }: any) => pending).length,
      [notifications]
   );
   const handleDrawerChange = () => {
      setOpen();
   };

   const handleListItemClick = (index: number | null) => {
      queryClientConfig.clear();
      setSelectedIndex(index);
   };

   const toggleNotifications = (op: boolean) => {
      setOpenNotifications(op);
   };

   return (
      <div>
         <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
               [classes.drawerOpen]: open,
               [classes.drawerClose]: !open,
            })}
            classes={{
               paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
               }),
            }}
         >
            <List className={classes.buttonList}>
               <Link
                  to="/catalogs"
                  className={classes.link}
                  onClick={() => handleListItemClick(null)}
               >
                  <ListItem className={classes.drawerHeader}>
                     <ListItemIcon>
                        <img
                           width="24px"
                           src="https://static.remotasks.com/uploads/catalog_logo.png"
                           alt=""
                        />
                     </ListItemIcon>
                     <Typography className={classes.drawerTitle}>Catalog</Typography>
                  </ListItem>
               </Link>

               <div className={classes.flexGrow}>
                  {drawerButtons.map((button, index) => (
                     <Link to={button.link} className={classes.link} key={index}>
                        <ListItem
                           button
                           disabled={button.text === 'Data Explorer' ? false : true}
                           className={
                              index === selectedIndex
                                 ? classes.buttonStyleSelected
                                 : classes.buttonStyle
                           }
                           onClick={(e) => handleListItemClick(index)}
                           selected={selectedIndex === index}
                           alignItems="flex-start"
                        >
                           <ListItemIcon>
                              <FontAwesomeIcon
                                 className={index === selectedIndex ? classes.iconSelected : ''}
                                 icon={button.icon}
                                 size="xl"
                              />
                           </ListItemIcon>
                           <ListItemText primary={button.text} className={classes.textButton} />
                        </ListItem>
                     </Link>
                  ))}
               </div>
               <div>
                  <ListItem
                     button
                     //  disabled
                     className={classes.buttonStyle}
                     onClick={() => toggleNotifications(true)}
                  >
                     <ListItemIcon>
                        <div className={classes.bellContainer}>
                           <FontAwesomeIcon icon={faBell} size="xl" />
                           {!!pendingNotAmount && (
                              <CircularIcon
                                 content={pendingNotAmount}
                                 extraStyles={classes.circularIcon}
                              />
                           )}
                        </div>
                     </ListItemIcon>
                     <ListItemText primary={'Notifications'} />
                  </ListItem>
                  <ListItem button className={classes.buttonStyle} onClick={toggleMode}>
                     <ListItemIcon>
                        <FontAwesomeIcon icon={mode === 'dark' ? faSun : faMoon} size="xl" />
                     </ListItemIcon>
                     <ListItemText primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'} />
                  </ListItem>
                  <ListItem button className={classes.buttonStyle} onClick={handleDrawerChange}>
                     <ListItemIcon>
                        {open ? (
                           <FontAwesomeIcon icon={faChevronLeft} size="xl" />
                        ) : (
                           <FontAwesomeIcon icon={faChevronRight} size="xl" />
                        )}
                     </ListItemIcon>
                     <ListItemText primary={'Close'} />
                  </ListItem>
               </div>
            </List>
         </Drawer>

         <NotificationBar isOpen={openNotifications} onToggle={toggleNotifications} />
      </div>
   );
}
