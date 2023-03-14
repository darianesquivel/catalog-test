import { useState } from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";

// STYLES
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100%",
    borderRadius: theme.shape.borderRadius / 2,
    marginTop: theme.spacing(1),
  },
  headerTab: {
    textTransform: "none",
    letterSpacing: "0.05rem",
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
}

export default function CustomTabs({ tabValues }: TpropsArray) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newIndex: number) => {
    setValue(newIndex);
  };
  return (
    <Paper square className={classes.content}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        {tabValues.map((column, idx) => (
          <Tab
            label={column.columnName}
            disabled={column.disabled}
            key={`${idx + column.columnName}`}
            className={classes.headerTab}
          />
        ))}
      </Tabs>
      <div className={classes.contentTabs}>{tabValues[value]?.content}</div>
    </Paper>
  );
}
