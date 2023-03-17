import { useRef, useState } from 'react';
import { Tooltip, Typography } from '@material-ui/core/';
import CopyToClipBoard from './CopyToClipBoard';

// STYLES
import { makeStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) => ({
   container: {
      padding: theme.spacing(1.2),
      overflow: 'auto',
      display: 'grid',
      gridTemplateColumns: '1fr ',
      gap: theme.spacing(2),
      rowGap: theme.spacing(2),
      justifyContent: 'space-between',
   },
   bold: {
      fontWeight: 'bold',
   },
   bullet: {
      cursor: 'pointer',
   },
   ellipsis: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
   },
   row: {
      height: '24px',
      display: 'flex',
      overflow: 'hidden',
      alignItems: 'center',
   },
   keys: { minWidth: '130px', maxWidth: '130px' },
   values: {},
}));

type Trows = {
   rows: { key: string; value: string }[];
   boldKeys?: boolean;
   extraStyles?: string;
};

export default function DetailTable({ rows, boldKeys, extraStyles }: Trows) {
   const classes = useStyles();
   const [showClipBoard, setShowClipboard] = useState<number | null>(null);
   const textRef = useRef(null);
   return (
      <div className={classNames(classes.container, extraStyles)}>
         {rows.map(({ key, value }, index: number) => {
            return (
               <div
                  className={classes.row}
                  key={`${key}`}
                  onMouseEnter={() => setShowClipboard(index)}
                  onMouseLeave={() => setShowClipboard(null)}
               >
                  <Tooltip title={key}>
                     <Typography
                        variant="body2"
                        className={classNames(classes.keys, classes.ellipsis, {
                           [classes.bold]: boldKeys,
                        })}
                     >
                        {key}
                     </Typography>
                  </Tooltip>
                  <>
                     <Tooltip title={value}>
                        <Typography
                           ref={textRef.current}
                           variant="body2"
                           className={classNames(classes.values, classes.ellipsis)}
                        >
                           {value}
                        </Typography>
                     </Tooltip>
                     {showClipBoard === index && <CopyToClipBoard value={value} />}
                  </>
               </div>
            );
         })}
      </div>
   );
}
