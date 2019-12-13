import React, { Component } from 'react';
import {SERVER_URL} from '../constants.js';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';



class Customerlist extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [] };
  } 

  componentDidMount() {
    this.fetchCustomers();
  }
  fetchCustomers = () => {
    fetch(SERVER_URL + 'api/customers')
    .then((response) => response.json())
    .then((responseData) => {
        this.setState({
            customers: responseData.content,
        });
    })
    .catch(err => console.error(err));
  }

  // Add a new customer
  addCustomer(customer) {
    fetch(SERVER_URL + 'api/customers', 
      { method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      })
    .then(res => this.fetchCustomers())
    .catch(err => console.error(err))
  } 

  // Update customer
  updateCustomer(customer, link) {
    fetch(link, 
    { method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(res => {
      toast.success("Changes saved", {
        position: toast.POSITION.BOTTOM_LEFT
      })
      this.fetchCustomers();
    })
    .catch(err => 
      toast.error("Error when saving cusomer", {
        position: toast.POSITION.BOTTOM_LEFT
      })
    )
  }

  // Delete Customer
  onDelClick = (link) => {
    if (window.confirm('Are you sure you want to delete customer?')) {
      fetch(link, {method: 'DELETE'
    })
      .then(res => {
        toast.success("Customer deleted", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        this.fetchCustomers();
      })
      .catch(err => {
        toast.error("Error when deleting", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err)
      }) 
    } 
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
    }, 
    // props are false so that sorting and filtering won't be enabled for the button columns
    {
      sortable: false,
      filterable: false,
      width: 100,      
      accessor: '_links.self.href',
      Cell: ({value, row}) => (<EditCustomer customer={row} link={value} updateCustomer={this.updateCustomer} fetchCustomers={this.fetchCustomers} />),
    },{
      id: 'delbutton',
      sortable: false,
      filterable: false,
      width: 100,
      accessor: '_links.self.href',
      Cell: ({value}) => (<button onClick={()=>{this.onDelClick(value)}}>Delete</button>)
    }]

    return (
      <div className="App">
        <AddCustomer addCustomer={this.addCustomer} fetchCustomers={this.fetchCustomers} />
        <ReactTable data={this.state.customers} columns={columns} 
          filterable={true} sortable={true}/>
        <ToastContainer autoClose={2000} /> 
      </div>
    );
  }
}

export default Customerlist;
