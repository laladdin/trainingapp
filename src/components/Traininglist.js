import React, { Component } from 'react';
import {SERVER_URL} from '../constants.js';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';


class Traininglist extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [] };
  } 

  componentDidMount() {
    fetch(SERVER_URL + 'trainings')
    .then((response) => response.json())
    .then((responseData) => {
        this.setState({
            trainings: responseData.content,
        });
    })
    .catch(err => console.error(err));
  }


  render() {
    const columns = [{
        id:"date",
        Header: 'Date and Time',
        accessor: date => {
            return moment(date.date).format('DD.MM.YYYY HH:mm')
        }
    },
    {
        Header: 'Duration (min)',
        accessor: 'duration'
    }]

    return (
      <div className="App">
        <ReactTable data={this.state.trainings} columns={columns} 
          filterable={true} sortable={true}/>
      </div>
    );
  }
}

export default Traininglist;
