import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddCustomer = (props) => {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value});
  }

  // Save customer and close modal form
  const handleSave = () => {
    props.addCustomer(customer);
    handleClose();
  }

  return (
    <div>
      <button style={{margin: 10}} onClick={handleClickOpen}>New Customer</button>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Customer</DialogTitle>
          <DialogContent>
          <input type="text" placeholder="Firstname" name="firstname" 
              value={customer.firstname} onChange={handleChange}/><br/> 
            <input type="text" placeholder="Lastname" name="lastname" 
              value={customer.lastname} onChange={handleChange}/><br/>
            <input type="text" placeholder="Street address" name="streetaddress" 
              value={customer.streetaddress} onChange={handleChange}/><br/>
            <input type="text" placeholder="Postcode" name="postcode" 
              value={customer.postcode} onChange={handleChange}/><br/>
            <input type="text" placeholder="City" name="city" 
              value={customer.city} onChange={handleChange}/><br/>
            <input type="text" placeholder="Email" name="email" 
              value={customer.email} onChange={handleChange}/><br/>
            <input type="text" placeholder="Phone" name="phone" 
              value={customer.phone} onChange={handleChange}/><br/>
          </DialogContent>
          <DialogActions>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleClose}>Cancel</button>
          </DialogActions>
        </Dialog>      
    </div>
  );
};

export default AddCustomer;