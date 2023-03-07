import { useCallback, useEffect, useState } from "react";

import { useStyles } from "./styles";
import { useMutateHook } from "../../hooks";
import queryClientConfig from "../../config/queryClientConfig";
import getFilteredCatalogs from "../../api/getFilteredCatalogs";
import { useHistory } from "react-router";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

export default function SearchBar() {
  const classes = useStyles();
  const history = useHistory();
  const getUrlTerm = useCallback(
    (url: string) => url?.match(/(?<=term=).+/gi)?.[0],
    []
  );

  const [term, setTerm] = useState<string>("");
  const { mutate } = useMutateHook(() => getFilteredCatalogs(term));
  const handleChange = (event: any) => {
    const { value } = event.target;
    setTerm(value);
  };

  useEffect(() => {
    const searchValue: string = getUrlTerm(history.location.search) || "";
    setTerm(searchValue);

    return history.listen(({ search }) => {
      setTerm(getUrlTerm(search) || "");
    });
  }, [getUrlTerm, history]);

  // Add a loading component
  const handleSubmit = (event: any) => {
    event.preventDefault();

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
