import { Container, Typography, Toolbar, IconButton } from '@material-ui/core';
import CustomTabs from '../../components/CustomTabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import DetailTable from '../../components/DetailTable';

// STYLES
import { makeStyles, Theme } from '@material-ui/core/styles';
import { unionBy, upperFirst } from 'lodash';
import { useMemo } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
   container: {
      height: 'calc(100vh - 103px)',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1),
      boxSizing: 'content-box',
   },
   header: {
      display: 'grid',
      gridTemplateColumns: '1fr 3fr',
      gap: theme.spacing(1),
      padding: theme.spacing(1),
   },
   image: {
      width: '100%',
   },
   description: {
      padding: theme.spacing(1),
      lineHeight: '18px',
   },
   accordion: {},
   titleSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
      padding: theme.spacing(2, 0),
   },
   title: {},
   brand: {},
   headerButtons: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
   },
   currentButton: {},
   toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
   },
   customTabs: {
      overflowY: 'auto',
   },
   bulletsStyles: {
      '& > div': {
         gap: theme.spacing(2),
      },
   },
}));

export default function SummaryDetails({ name, image, description, closeModal, ...extra }: any) {
   const classes = useStyles();

   const extraBullets = useMemo(() => {
      if (extra?.dinamicFields) {
         return Object.entries(extra.dinamicFields).map(([key, value]: any) => ({
            key: upperFirst(key),
            value,
         }));
      } else return [];
   }, [extra?.dinamicFields]);

   const metadataContent = unionBy(
      [
         { key: 'Title', value: name },
         { key: 'Image', value: image },
         { key: 'Description', value: description },
         ...extraBullets,
      ],
      'key'
   );

   const tabs = [
      {
         columnName: 'Metadata',
         content: (
            <DetailTable rows={metadataContent} boldKeys extraStyles={classes.bulletsStyles} />
         ),
      },
      {
         columnName: 'Enrichment',
         content: null,
         disabled: true,
      },
      {
         columnName: 'Assistant',
         content: null,
         disabled: true,
      },
   ];

   return (
      <Container className={classes.container}>
         <Toolbar className={classes.toolbar} disableGutters>
            <IconButton onClick={() => closeModal()}>
               <FontAwesomeIcon icon={faAngleRight} size="sm" width="20px" fontWeight="bold" />
            </IconButton>
            <Typography variant="h6" noWrap>
               Catalogs Explorer
            </Typography>
         </Toolbar>
         <div className={classes.header}>
            <div>
               <img src={image} className={classes.image} alt="main url" />
            </div>
            <div className={classes.titleSection}>
               <div>
                  <Typography variant="body2">Title</Typography>
                  <Typography className={classes.title} variant="caption">
                     {name}
                  </Typography>
               </div>

               <div>
                  <Typography variant="body2">Brand</Typography>
                  <Typography className={classes.brand} variant="caption">
                     Default
                  </Typography>
               </div>
            </div>
         </div>
         <div className={classes.description}>
            <Typography variant="body2">Description</Typography>
            <Typography variant="caption">{description}</Typography>
         </div>
         <CustomTabs tabValues={tabs} extraStyles={classes.customTabs} />
      </Container>
   );
}
