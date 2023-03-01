import React from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";
import useStyles from "./styles";

interface TpropsArray {
  tabValues: { columnName: string; content: any; disabled?: boolean }[];
}

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
        {tabValues.map((column, idx) => (
          <Tab
            label={column.columnName}
            disabled={column.disabled}
            key={`${idx + column.columnName}`}
          ></Tab>
        ))}
      </Tabs>
      <div className={classes.content}>{tabValues[value]?.content}</div>
    </Paper>
  );
}
