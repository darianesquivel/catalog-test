import React from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface TpropsArray {
  tabValues: { columnName: string; content: any; disabled?: boolean }[];
}

const useStyles = makeStyles({
  content: {
    height: "100%",
  },
});

export default function CustomTabs({ tabValues }: TpropsArray) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
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
        {tabValues.map((column) => (
          <Tab label={column.columnName} disabled={column.disabled}></Tab>
        ))}
      </Tabs>
      <div className={classes.content}>{tabValues[value]?.content}</div>
    </Paper>
  );
}
