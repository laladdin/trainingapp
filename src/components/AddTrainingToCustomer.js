import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddTraining = (props) => {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({date: '', duration: '', activity: ''});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
  }

  // Save training and close modal form
  const handleSave = () => {
    props.addCustomer(training);
    handleClose();
  }

  return (
    <div>
      <button style={{margin: 10}} onClick={handleClickOpen}>New Training</button>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Training</DialogTitle>
          <DialogContent>
          <input type="text" placeholder="Date" name="date" 
              value={training.date} onChange={handleChange}/><br/> 
            <input type="text" placeholder="Duration" name="duration" 
              value={training.duration} onChange={handleChange}/><br/>
            <input type="text" placeholder="activity" name="activity" 
              value={training.activity} onChange={handleChange}/><br/>
          </DialogContent>
          <DialogActions>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleClose}>Cancel</button>
          </DialogActions>
        </Dialog>      
    </div>
  );
};

export default AddTraining;