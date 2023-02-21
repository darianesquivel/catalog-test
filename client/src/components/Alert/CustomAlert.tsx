import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles(() => {
  return {
    root: {},
  };
});
type Tseverity = "error" | "warning" | "info" | "success";
type Tvariant = "filled" | "outlined" | "standard";

type TalertProps = {
  alertType: Tseverity;
  message: string;
  propClassName?: any;
  variant?: Tvariant;
  title?: boolean;
};
export default function CustomAlert({
  alertType,
  message,
  propClassName,
  variant,
  title = true,
}: TalertProps) {
  const variantValue = variant || "standard";
  return (
    <Alert
      severity={alertType}
      className={propClassName}
      variant={variantValue}
    >
      {title ? (
        <AlertTitle>
          {alertType.replace(/^[a-z]/gi, (r) => r.toUpperCase())}
        </AlertTitle>
      ) : null}
      {message}
    </Alert>
  );
}
