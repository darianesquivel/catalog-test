import { makeStyles, Theme } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) => {
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
  title?: string;
  closeIcon?: boolean;
  onClose?: () => void;
};
export default function CustomAlert({
  alertType,
  message,
  propClassName,
  variant,
  title,
  closeIcon = false,
  onClose,
}: TalertProps) {
  const classes = useStyles();
  const variantValue = variant || "standard";
  const currentTitle = title ? title : alertType;
  return (
    <Alert
      severity={alertType}
      className={`${classes.root} ${propClassName}`}
      variant={variantValue}
      action={
        closeIcon && (
          <IconButton
            aria-label="close"
            color="inherit"
            size="medium"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        )
      }
    >
      {title ? (
        <AlertTitle>
          {currentTitle.replace(/^[a-z]/gi, (r) => r.toUpperCase())}
        </AlertTitle>
      ) : null}
      {message}
    </Alert>
  );
}
