import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import getAllCatalogs from "../../api/getAllCatalogs";
import {
  FormControl,
  Input,
  FormHelperText,
  TextField,
  InputLabel,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  container: {
    // display: "flex",
    // flexFlow: "wrap row",
    width: "30%",
    margin: "0 auto",
    padding: "100px",
    background: "#999",
  },
}));

// const { data: catalogs, status } = useQuery(["catalogs"], getAllCatalogs);

const FormCreator = () => {
  const classes = useStyles();
  const [fields, setFields] = useState({ name: "", description: "" });
  const handleChange = (e: any) => {
    console.log(e.target.name);
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormControl className={classes.container}>
        <h2>Name</h2>
        <Input
          onChange={handleChange}
          name="name"
          id="my-input"
          aria-describedby="my-helper-text"
          defaultValue={fields.name}
        />
        <h2>Description</h2>
        <Input
          onChange={handleChange}
          name="description"
          aria-describedby="my-helper-text"
          value={fields.description}
        />
      </FormControl>
      {/* show catalogs */}
    </>
  );
};

export default FormCreator;
