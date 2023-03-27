import { makeStyles, MenuItem, MenuList, Popover, Theme, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
   button: {
      display: 'flex',
      borderRadius: theme.shape.borderRadius,
   },
   typographyButtons: {
      fontSize: '14px',
      textTransform: 'initial',
      marginLeft: theme.spacing(2),
   },
}));
type PopOverProps = {
   options: { id: string; content: string; disabled: boolean; icon: any }[];
   buttonTarget: HTMLButtonElement | null;
   setButtonTarget: (value: any) => any;
   currentOption: string | null;
   setCurrentOption: (currentOption: string | null) => any;
   onClose: () => any;
};

export default function PopOverList({
   options,
   buttonTarget,
   setButtonTarget,
   currentOption,
   setCurrentOption,
   onClose,
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
               {options.map(({ id, content, disabled, icon }) => (
                  <MenuItem key={id} onClick={() => handleOption(id)} disabled={disabled}>
                     {icon}
                     <Typography className={classes.typographyButtons}>{content}</Typography>
                  </MenuItem>
               ))}
            </MenuList>
         </Popover>
      </>
   );
}
