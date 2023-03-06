import React, { useCallback, useState } from "react";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./styles";
import { useMutateHook } from "../../hooks";
import queryClientConfig from "../../config/queryClientConfig";
import getFilteredCatalogs from "../../api/getFilteredCatalogs";
import { useHistory } from "react-router";
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { Search, Replay } from "@material-ui/icons";

export default function SearchBar() {
  const classes = useStyles();
  const history = useHistory();
  const getUrlTerm = useCallback(
    (url: string) => url?.match(/(?<=term=).+/gi)?.[0],
    []
  );

  const initialValue = getUrlTerm(history.location.search);
  const [term, setTerm] = useState(initialValue);

  const { mutate } = useMutateHook(() => getFilteredCatalogs(term));
  const handleChange = (event: any) => {
    const { value } = event.target;
    setTerm(value);
  };

  // Agregar el isLoading
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("se subitea");
    if (!term) {
      setTerm("");
      history.push("/catalogs");
    } else {
      history.push({
        pathname: "/catalogs",
        search: term ? `?term=${term}` : "",
      });
      mutate(undefined, {
        onSuccess: (data: any) =>
          queryClientConfig.setQueryData(["catalogs"], data),
      });
    }
  };
  return (
    <form className={classes.searchBar} onSubmit={handleSubmit}>
      <FormControl fullWidth margin="dense" variant="outlined">
        <InputLabel htmlFor="search">
          <Typography variant="body2"> Search for Catalog </Typography>
        </InputLabel>
        <OutlinedInput
          id="search"
          value={term}
          onChange={handleChange}
          endAdornment={
            <InputAdornment disablePointerEvents position="end">
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
