import React, { Component } from 'react';
import {SERVER_URL} from '../constants.js';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import 'react-toastify/dist/ReactToastify.css';


class Customerlist extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [] };
  } 

  componentDidMount() {
    fetch(SERVER_URL + 'customers')
    .then((response) => response.json())
    .then((responseData) => {
        this.setState({
            customers: responseData.content,
        });
    })
    .catch(err => console.error(err));
  }


  render() {
    const columns = [{
      Header: 'Firstname',
      accessor: 'firstname'
    }, {
      Header: 'Lastname',
      accessor: 'lastname',
    }, {
      Header: 'Street address',
      accessor: 'streetaddress',
    }, {
      Header: 'Postcode',
      accessor: 'postcode',
    },{
      Header: 'City',
      accessor: 'city',
    }, {
      Header: 'Email',
      accessor: 'email',
    },{
      Header: 'Phonenumber',
      accessor: 'phone',
    }]

    return (
      <div className="App">
        <ReactTable data={this.state.customers} columns={columns} 
          filterable={true} sortable={true}/>
      </div>
    );
  }
}

export default Customerlist;
