import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import toHex from 'colornames';
import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { Button, Checkbox, ListItemText, Typography } from '@material-ui/core';
import { useState } from 'react';
import classNames from 'classnames';

const drawerWidth = 250;

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      container: {
         '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.background.default,
            border: 'none',
         },
      },
      appBar: {
         zIndex: theme.zIndex.drawer + 1,
         transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
         }),
      },
      appBarShift: {
         marginLeft: drawerWidth,
         width: `calc(100% - ${drawerWidth}px)`,
         transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
         }),
      },
      drawer: {
         width: drawerWidth,
         flexShrink: 0,
         whiteSpace: 'nowrap',
         marginRight: '10px',
         height: 'calc(100vh - 115px)',
      },
      drawerOpen: {
         width: drawerWidth,
         position: 'relative',
         transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
         }),
      },
      drawerClose: {
         position: 'relative',
         transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
         }),
         overflowX: 'hidden',
         [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
         },
      },
      toolbar: {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'flex-end',
         padding: theme.spacing(0, 1),
         // necessary for content to be below app bar
         ...theme.mixins.toolbar,
      },
      color: {
         width: 50,
         height: 30,
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alingItems: 'center',
         boxShadow: `inset 0 0 0 2px ${theme.palette.action.focus} `,
         cursor: 'pointer',
         borderRadius: theme.shape.borderRadius,
         fontSize: '10px',
      },
      colorSelected: {
         boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main} `,
      },
      colors: {
         display: 'flex',
         flexWrap: 'wrap',
         gap: '2px',
      },
      formControl: {
         margin: theme.spacing(1),
         minWidth: 120,
         maxWidth: 300,
      },
      chips: {
         display: 'flex',
         flexWrap: 'wrap',
      },
      chip: {
         margin: 2,
      },
      buttonColor: {
         textTransform: 'capitalize',
      },
      icon: { width: '100%', display: 'flex' },
   })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
};

type Tprops = {
   data: any;
   onFilter: any;
};

export default function GridViewFilter({ data, onFilter }: Tprops) {
   const classes = useStyles();
   const theme = useTheme();
   const [open, setOpen] = useState(false);
   const [brandName, setBrandName] = useState<string[]>([]);
   const [sizeName, setSizeName] = useState<string[]>([]);
   const [colorName, setColorName] = useState<string[]>([]);
   const [others, setOthers] = useState(false);

   const handleDrawer = () => {
      setOpen(!open);
   };

   const handleChangeBrand = (event: React.ChangeEvent<{ value: unknown }>) => {
      setBrandName(event.target.value as string[]);
   };

   const handleChangeSize = (event: React.ChangeEvent<{ value: unknown }>) => {
      setSizeName(event.target.value as string[]);
   };

   const handleChangeColor = (event: any) => {
      const color = event.target.id;
      if (colorName.includes(color)) {
         setColorName(colorName.filter((name) => name !== color));
      } else {
         setColorName([...colorName, color]);
      }

      if (color === 'othersColors') {
         setOthers(!others);
         setColorName((prev) => [...prev, ...othersColors]);
      }
   };

   const colors: any = [];
   const othersColors: any = [];
   const sizes: any = [];
   const brands: any = [];

   data?.forEach((prod: any) => {
      if (!colors.includes(prod.color) && !!prod.color && !!toHex(prod.color)) {
         colors.push(prod.color);
      }
      if (!othersColors.includes(prod.color) && !!prod.color && !toHex(prod.color)) {
         othersColors.push(prod.color);
      }
      if (!sizes.includes(prod.size)) {
         sizes.push(prod.size);
      }
      if (!brands.includes(prod.brand)) {
         brands.push(prod.brand);
      }
   });

   return (
      <div className={classes.container}>
         <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
               [classes.drawerOpen]: open,
               [classes.drawerClose]: !open,
            })}
            classes={{
               paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
               }),
            }}
         >
            <div className={classes.toolbar}>
               <IconButton onClick={handleDrawer}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
               </IconButton>
            </div>
            {open ? (
               <div
                  style={{
                     display: 'flex',
                     flexDirection: 'column',
                  }}
               >
                  <Typography>Brands</Typography>
                  <FormControl className={classes.formControl}>
                     <InputLabel id="demo-mutiple-checkbox-label">Select...</InputLabel>
                     <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        value={brandName}
                        onChange={handleChangeBrand}
                        input={<Input />}
                        renderValue={(selected) => (
                           <div className={classes.chips}>
                              {(selected as string[]).map((value) => (
                                 <Chip key={value} label={value} className={classes.chip} />
                              ))}
                           </div>
                        )}
                        MenuProps={MenuProps}
                     >
                        {brands.map((brand: any) => (
                           <MenuItem key={brand} value={brand}>
                              <Checkbox color="primary" checked={brandName.indexOf(brand) > -1} />
                              <ListItemText primary={brand} />
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
                  <Typography>Colors</Typography>
                  <div className={classes.colors}>
                     {colors.map((color: any) => {
                        return (
                           <div
                              className={classNames(classes.color, {
                                 [classes.colorSelected]: colorName.includes(color),
                              })}
                              key={color}
                              id={color}
                              onClick={handleChangeColor}
                              style={{
                                 background: `${toHex(color)}`,
                              }}
                           ></div>
                        );
                     })}
                     {
                        <div
                           className={classNames(classes.color, {
                              [classes.colorSelected]: others,
                           })}
                           key={'othersColors'}
                           id={'othersColors'}
                           onClick={handleChangeColor}
                        >
                           OTHER
                        </div>
                     }
                  </div>
                  <Typography>Sizes</Typography>
                  <FormControl className={classes.formControl}>
                     <InputLabel id="demo-mutiple-checkbox-label">Select...</InputLabel>
                     <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        value={sizeName}
                        onChange={handleChangeSize}
                        input={<Input />}
                        renderValue={(selected) => (
                           <div className={classes.chips}>
                              {(selected as string[]).map((value) => (
                                 <Chip key={value} label={value} className={classes.chip} />
                              ))}
                           </div>
                        )}
                        MenuProps={MenuProps}
                     >
                        {sizes.map((size: any) => (
                           <MenuItem key={size} value={size}>
                              <Checkbox color="primary" checked={sizeName.indexOf(size) > -1} />
                              <ListItemText primary={size} />
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
                  <Button
                     onClick={() =>
                        onFilter({ brand: brandName, size: sizeName, color: colorName })
                     }
                  >
                     Apply Filters
                  </Button>
               </div>
            ) : null}
         </Drawer>
      </div>
   );
}
