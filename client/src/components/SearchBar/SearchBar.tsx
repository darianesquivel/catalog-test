import { useStyles } from "./styles";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
interface Tprops {
  initialTerm: string | undefined;
  onSubmit: () => void;
  onChange: (value: string) => void;
}
export default function SearchBar({ initialTerm, onSubmit, onChange }: Tprops) {
  const classes = useStyles();

  const handleChange = (event: any) => {
    const { value } = event.target;
    onChange(value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className={classes.searchBar} onSubmit={handleSubmit}>
      <FormControl fullWidth margin="dense" variant="outlined">
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
