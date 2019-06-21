import React from 'react';
import {
  Button,
  // AppBar,
  // Avatar,
  // SwipeableDrawer,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  // TimePicker,
  // DateTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Layout = () => (
  <div>
    <h1>Tree shaking</h1>
    <Button>Button</Button>
    {/* <AppBar />
    <Avatar />
    <SwipeableDrawer /> */}
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker />
      {/* <TimePicker />
      <DateTimePicker /> */}
    </MuiPickersUtilsProvider>
  </div>
);

export default Layout;
