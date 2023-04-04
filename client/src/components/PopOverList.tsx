import {
   makeStyles,
   MenuItem,
   MenuList,
   Popover,
   Theme,
   Tooltip,
   Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
   button: {
      display: 'flex',
      borderRadius: theme.shape.borderRadius,
   },
   typographyButtons: {
      fontSize: '14px',
      textTransform: 'initial',
   },
   icons: {
      marginRight: theme.spacing(2),
   },
}));
type PopOverProps = {
   options: { id: string; content: string; disabled?: boolean; icon?: any; optionDesc?: string }[];
   buttonTarget: HTMLButtonElement | null;
   setButtonTarget: (value: any) => any;
   setCurrentOption: (currentOption: string | null) => any;
};

export default function PopOverList({
   options,
   buttonTarget,
   setButtonTarget,
   setCurrentOption,
}: PopOverProps) {
   const classes = useStyles();
   const handleOption = (id: string) => {
      setCurrentOption(id);
   };
   const menuOpen = Boolean(buttonTarget);
   const targetId = menuOpen ? 'simple-popover' : undefined;
   return (
      <>
         <Popover
            id={targetId}
            open={menuOpen}
            anchorEl={buttonTarget}
            onClose={() => setButtonTarget(null)}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'right',
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'center',
            }}
         >
            <MenuList>
               {options.map(({ id, content, disabled, icon, optionDesc = '' }) => (
                  <Tooltip key={id} title={optionDesc} placement="top-start" enterDelay={1000}>
                     <MenuItem
                        alignItems="center"
                        onClick={() => handleOption(id)}
                        disabled={disabled}
                     >
                        {icon && <span className={classes.icons}>{icon}</span>}
                        <Typography className={classes.typographyButtons}>{content}</Typography>
                     </MenuItem>
                  </Tooltip>
               ))}
            </MenuList>
         </Popover>
      </>
   );
}
