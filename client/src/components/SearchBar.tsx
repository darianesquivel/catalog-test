import {
   FormControl,
   IconButton,
   InputAdornment,
   InputLabel,
   OutlinedInput,
   Typography,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      searchBar: {
         width: '100%',
      },
   })
);
interface Tprops {
   initialTerm: string | undefined;
   onSubmit: (term: string | undefined) => void;
   onChange: (value: string) => void;
   searching: boolean;
}
export default function SearchBar({ initialTerm = '', onSubmit, onChange, searching }: Tprops) {
   const classes = useStyles();

   const handleChange = (event: any) => {
      const { value } = event.target;
      onChange(value);
   };
   const handleSubmit = (event: any) => {
      event.preventDefault();
      onSubmit(initialTerm);
   };

   return (
      <form className={classes.searchBar} onSubmit={handleSubmit}>
         <FormControl fullWidth margin="dense" variant="outlined" disabled={searching}>
            <InputLabel htmlFor="search">
               <Typography variant="body2"> Search for Catalog </Typography>
            </InputLabel>
            <OutlinedInput
               id="search"
               value={initialTerm}
               onChange={handleChange}
               endAdornment={
                  <InputAdornment onClick={handleSubmit} position="end">
                     <IconButton edge="end">
                        <Search />
                     </IconButton>
                  </InputAdornment>
               }
               labelWidth={117}
            />
         </FormControl>
      </form>
   );
}
