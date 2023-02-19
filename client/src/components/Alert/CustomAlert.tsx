import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles(() => {
  return {
    root: {},
  };
});
type Tseverity = "error" | "warning" | "info" | "success";

type TalertProps = {
  alertType: Tseverity;
  message: string;
  propClassName?: any;
};
export default function CustomAlert({
  alertType,
  message,
  propClassName,
}: TalertProps) {
  return (
    <Alert severity={alertType} className={propClassName}>
      <AlertTitle>
        {alertType.replace(/^[a-z]/gi, (r) => r.toUpperCase())}
      </AlertTitle>
      {message}
    </Alert>
  );
}
