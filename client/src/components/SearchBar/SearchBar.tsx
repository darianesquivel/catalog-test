import React, { useState } from "react";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./styles";
import { useMutateHook } from "../../hooks";
import queryClientConfig from "../../config/queryClientConfig";
import getFilteredCatalogs from "../../api/getFilteredCatalogs";
import { useHistory } from "react-router";

export default function SearchBar() {
  const classes = useStyles();
  const history = useHistory();

  const initialValue = history.location.search?.match(/(?<=term\=).+/gi)?.[0];
  const [term, setTerm] = useState(initialValue);

  const { mutate } = useMutateHook(() => getFilteredCatalogs(term));
  const handleChange = (event: any) => {
    const { value } = event.target;
    setTerm(value);
  };

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
    <form className={classes.root} onSubmit={handleSubmit}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          value={term}
          onChange={handleChange}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </form>
  );
}
