import React, { Component } from 'react';
import {SERVER_URL} from '../constants.js';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import AddTraining from './AddTrainingToCustomer';


class Traininglist extends Component {
  constructor(props) {
    super(props);
    this.state = { trainings: [] };
  } 

  componentDidMount() {
    this.fetchTrainings();
  }

  fetchTrainings = () => {
    fetch(SERVER_URL + 'api/trainings')
    .then((response) => response.json())
    .then((responseData) => {
        this.setState({
            trainings: responseData.content,
        });
    })
    .catch(err => console.error(err));
  }

   // Delete Training
   onDelClick = (link) => {
    if (window.confirm('Are you sure you want to delete training?')) {
      fetch(link, {method: 'DELETE'
    })
      .then(res => {
        toast.success("Training deleted", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        this.fetchTrainings();
      })
      .catch(err => {
        toast.error("Error when deleting", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err)
      }) 
    } 
  }

  // Add a new training
  addTraining(training) {
    fetch(SERVER_URL + 'api/trainings', 
      { method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
      })
    .then(res => this.fetchTrainings())
    .catch(err => console.error(err))
  } 

  render() {
    const columns = [{
    id:"date",
    Header: 'Date and Time',
    accessor: date => {
        return moment(date.date).format('DD.MM.YYYY HH:mm')
    }
    },{
      Header: "Activity",
      accessor: "activity"
    },{
      Header: 'Duration (min)',
      accessor: 'duration'
    },{
      Header: "Customer",
      accessor: "customer"
    },{
      id: 'delbutton',
      sortable: false,
      filterable: false,
      width: 100,
      accessor: '',
      Cell: ({value}) => (<button onClick={()=>{this.onDelClick(value)}}>Delete</button>)
    }]

    return (
      <div className="App">
        <AddTraining addTraining={this.addTraining} fetchTrainings={this.fetchTrainings} />
        <ReactTable data={this.state.trainings} columns={columns} 
          filterable={true} sortable={true}/>
        <ToastContainer autoClose={2000} /> 
      </div>
    );
  }
}

export default Traininglist;
