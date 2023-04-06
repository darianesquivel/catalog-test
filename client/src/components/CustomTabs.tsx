import { useState } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';

// STYLES
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
   content: {
      height: '100%',
      borderRadius: theme.shape.borderRadius / 2,
      width: '100%',
      marginTop: theme.spacing(1),
   },
   headerTab: {
      textTransform: 'none',
      letterSpacing: '0.05rem',
      backgroundColor: `${theme.palette.background.paper} !important`,
   },
   contentTabs: {
      marginTop: theme.spacing(1),
   },
}));

interface TpropsArray {
   tabValues: {
      columnName: string;
      content: React.ReactNode | null;
      disabled?: boolean;
   }[];
   extraStyles?: string;
}

export default function CustomTabs({ tabValues, extraStyles }: TpropsArray) {
   const classes = useStyles();
   const [value, setValue] = useState(0);
   const handleChange = (event: React.ChangeEvent<{}>, newIndex: number) => {
      setValue(newIndex);
   };
   return (
      <Paper square className={classNames(classes.content, extraStyles)}>
         <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange}>
            {tabValues.map((column) => (
               <Tab
                  label={column.columnName}
                  disabled={column.disabled}
                  key={`${column.columnName}`}
                  className={classes.headerTab}
               />
            ))}
         </Tabs>
         <div className={classes.contentTabs}>{tabValues[value]?.content}</div>
      </Paper>
   );
}
