import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const EditTraining = (props) => {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({date: '', duration: '', activity: ''});

  const handleClickOpen = () => {
    setTraining({date: props.training.date, duration: props.training.duration, activity: props.training.activity})
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
  }

  // Update training and close modal form
  const handleSave = () => {
    props.updateCustomer(training, props.link);
    handleClose();
  }

  return (
    <div>
      <button onClick={handleClickOpen}>Edit</button>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit the training info</DialogTitle>
          <DialogContent>
          <input type="text" placeholder="Date" name="date" 
              value={training.date} onChange={handleChange}/><br/> 
            <input type="text" placeholder="Duration" name="duration" 
              value={training.duration} onChange={handleChange}/><br/>
            <input type="text" placeholder="activity" name="streetaddress" 
              value={training.activity} onChange={handleChange}/><br/>
          </DialogContent>
          <DialogActions>
            <button onClick={handleSave}>Submit</button>
            <button onClick={handleClose}>Cancel</button>
          </DialogActions>
        </Dialog>      
    </div>
  );
};

export default EditTraining;