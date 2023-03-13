import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import { useStore } from "../DrawerAppbar/DrawerAppbar";

const useStyles = makeStyles({
  mainBox: {},
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function NotificationPanel() {
  const classes = useStyles();
  const { notifications } = useStore();
  console.log({ notifications });

  const tabs = ({ pending, previous }: any) => [
    {
      columnName: "Pending",
      content: <div>{pending}</div>,
    },
    {
      columnName: "Previous",
      content: null,
      disabled: false,
    },
  ];

  const [open, setOpen] = useState(true);

  const toggleDrawer =
    (op: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(op);
    };

  return (
    <>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        <div className={classes.mainBox}>
          <CustomTabs tabValues={tabs(notifications)} />
        </div>
      </Drawer>
    </>
  );
}
