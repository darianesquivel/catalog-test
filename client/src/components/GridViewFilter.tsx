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
            backgroundColor: theme.palette.background.paper,
            border: 'none',
         },
      },
      drawer: {
         width: drawerWidth,
         flexShrink: 0,
         whiteSpace: 'nowrap',
         marginRight: '10px',
         height: 'calc(100vh - 135px)',
      },
      drawerOpen: {
         width: drawerWidth,
         position: 'relative',
         marginRight: '12px',
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
         justifyContent: 'space-between',
         padding: theme.spacing(0, 1.6),
         // necessary for content to be below app bar
         ...theme.mixins.toolbar,
      },
      color: {
         width: 35,
         height: 25,
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alingItems: 'center',
         boxShadow: `inset 0 0 0 2px ${theme.palette.action.focus} `,
         cursor: 'pointer',
         borderRadius: theme.shape.borderRadius,
         fontSize: '10px',
      },
      colorName: {
         width: 70,
         display: 'flex',
         padding: theme.spacing(0.2),
         fontWeight: 500,
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
      optionsContainer: {
         display: 'flex',
         flexDirection: 'column',
         height: '70vh',
         padding: theme.spacing(0, 0, 0, 1),
      },
      optionContainer: {
         margin: theme.spacing(1, 0),
         padding: theme.spacing(1),
      },
      applyButton: {
         textTransform: 'capitalize',
         margin: theme.spacing(1, 3),
      },
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

      if (color === 'othersColors') {
         let include = othersColors.some((el: any) => colorName.includes(el));
         setOthers(!others);
         if (include) {
            setColorName(colorName.filter((name) => !othersColors.includes(name)));
         } else {
            setColorName((prev) => [...prev, ...othersColors]);
         }
      } else {
         if (colorName.includes(color)) {
            setColorName(colorName.filter((name) => name !== color));
         } else {
            setColorName([...colorName, color]);
         }
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
      if (prod.size && !sizes.includes(prod.size)) {
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
               {open ? <Typography variant="h6">Filters</Typography> : null}

               <IconButton onClick={handleDrawer}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
               </IconButton>
            </div>
            {open ? (
               <div className={classes.optionsContainer}>
                  <div className={classes.optionContainer}>
                     <Typography variant="body2">Brands</Typography>
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
                                    <Chip
                                       size="small"
                                       color="primary"
                                       key={value}
                                       label={value}
                                       className={classes.chip}
                                    />
                                 ))}
                              </div>
                           )}
                           MenuProps={MenuProps}
                        >
                           {brands.map((brand: any) => (
                              <MenuItem key={brand} value={brand}>
                                 <Checkbox
                                    color="primary"
                                    checked={brandName.indexOf(brand) > -1}
                                 />
                                 <ListItemText primary={brand} />
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </div>

                  <div className={classes.optionContainer}>
                     <Typography variant="body2">Colors</Typography>
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
                        {othersColors?.length ? (
                           <div
                              className={classNames(classes.color, classes.colorName, {
                                 [classes.colorSelected]: colorName.some((el: any) =>
                                    othersColors.includes(el)
                                 ),
                              })}
                              key={'othersColors'}
                              id={'othersColors'}
                              onClick={handleChangeColor}
                           >
                              Others Colors
                           </div>
                        ) : null}
                     </div>
                  </div>

                  <div className={classes.optionContainer}>
                     <Typography variant="body2">Sizes</Typography>
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
                                    <Chip
                                       size="small"
                                       color="primary"
                                       key={value}
                                       label={value}
                                       className={classes.chip}
                                    />
                                 ))}
                              </div>
                           )}
                           MenuProps={MenuProps}
                        >
                           {sizes.map((size: any) => (
                              <MenuItem key={size} value={size}>
                                 <Checkbox color="primary" checked={sizeName.indexOf(size) > -1} />
                                 <ListItemText key={size} primary={size} />
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </div>

                  <Button
                     onClick={() =>
                        onFilter({ brand: brandName, size: sizeName, color: colorName })
                     }
                     variant="outlined"
                     color="primary"
                     className={classes.applyButton}
                  >
                     Apply Filters
                  </Button>
               </div>
            ) : null}
         </Drawer>
      </div>
   );
}
