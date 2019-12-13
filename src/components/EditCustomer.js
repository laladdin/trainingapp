import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const EditCustomer = (props) => {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''});

  const handleClickOpen = () => {
    setCustomer({firstname: props.customer.firstname, lastname: props.customer.lastname, streetaddress: props.customer.streetaddress, postcode: props.customer.postcode, city: props.customer.city, email: props.customer.email,
    phone: props.customer.phone})
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value});
  }

  // Update customer and close modal form
  const handleSave = () => {
    props.updateCustomer(customer, props.link);
    handleClose();
  }

  return (
    <div>
      <button onClick={handleClickOpen}>Edit</button>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit the customer info</DialogTitle>
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
            <button onClick={handleSave}>Submit</button>
            <button onClick={handleClose}>Cancel</button>
          </DialogActions>
        </Dialog>      
    </div>
  );
};

export default EditCustomer;