import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/';
import './Admin.css';
import * as XLSX from 'xlsx';
import axios from 'axios';
import Modal from 'react-modal';


const Admin = (domain) => {

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [isUnapprovedSectionOpen, setUnapprovedSectionOpen] = useState(false);
  const [isAllReservationsOpen, setAllReservationsOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // filtered appointments :
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [watchAllAppointments, setWatchAllAppointments] = useState(true);
  const [filterDate, setFilterDate] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filterApproved, setFilterApproved] = useState(false);
  const [filterUnapproved, setFilterUnapproved] = useState(false);

  // customer searching
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputSearch, setInputSearch] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  }

  const handleFilterChange = () => {
    if(watchAllAppointments) {
      setFilteredAppointments(appointments);
    } else {
      let filteredResults = appointments;

      if(filterDate) {
        if(fromDate) {
          filteredResults= filteredResults.filter((appointment)=> {
            return new Date(appointment.date) >= new Date(fromDate);
          })
        }
        if(toDate) {
          filteredResults= filteredResults.filter((appointment)=> {
            return new Date(appointment.date) <= new Date(toDate);
          })
        }
      }

      if(filterApproved && !filterUnapproved) {
        filteredResults = filteredResults.filter((appointment) => appointment.approvedByAdmin);
      }

      if(!filterApproved && filterUnapproved) {
        filteredResults = filteredResults.filter((appointment) => !appointment.approvedByAdmin);
      }

      if(!filterApproved && !filterUnapproved) {
        filteredResults =[];
      }

      setFilteredAppointments(filteredResults);

    }
  }

  const handleWatchAll = () => {
    setWatchAllAppointments(!watchAllAppointments);
    setFilterDate(false);
    setFilterApproved(true);
    setFilterUnapproved(true);
  }

  const handleFilterByDate = () => {
    setFilterDate(!filterDate)
  }

  const handleFilterApproved = () => {
    setFilterApproved(!filterApproved);
  }

  const handleFilterUnapproved = () => {
    setFilterUnapproved(!filterUnapproved);
  }

  const handleChangeFromDate = (event) => {
    setFromDate(event.target.value);
    if(toDate < event.target.value) {
      setToDate(event.target.value);
    }
  }

  const handleChangeToDate = (event) => {
    setToDate(event.target.value);
  }

  const flattenObject = (obj, parentKey = '') => {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(acc, flattenObject(obj[key], newKey));
      } else {
        acc[newKey] = obj[key];
      }
      return acc;
    }, {});
  };

  const createExcel = (data, filename) => {
    const flattenedData = data.map(item => flattenObject(item));

    const ws = XLSX.utils.json_to_sheet(flattenedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const handleCreateAppointmentsExcel = () => {
    createExcel(filteredAppointments, 'filtered appointments report');
  }

  const navigation = useHistory();

  const jwtToken = localStorage.getItem('token');

  console.log(jwtToken);

   useEffect(() => {
    axios.get(`${domain}/admin/getAppointments`, {
      headers: { 
        Authorization: `Bearer ${jwtToken}`,
       }
      })
      .then(response => {
        // console.log(response);
        setAppointments(response.data.modifiedAppointments);
        setFilteredAppointments(response.data.modifiedAppointments);
        // console.log(appointments);
        returnToNormalCSS();
        
      })
      .catch(error => {
        setLoginModalOpen(true);
        document.body.style.overflow = 'hidden';
        document.body.classList.add('blurred');
        const modalElement = document.querySelector('.modal');
        if(modalElement) {
          modalElement.style.filter = 'none !important';
        }
      });
  }, [jwtToken, navigation, refresh]);

  useEffect(() => {
    axios.get(`${domain}/admin/getCustomers`, {
      headers: { 
        Authorization: `Bearer ${jwtToken}`,
       }
      })
      .then(response => {
        setCustomers(response.data.customers);
        setFilteredCustomers(response.data.customers);
        
      })
      .catch(error => {
        console.log('Error fetching customers details:', error);
        
      });
  }, [refresh]);

  const returnToNormalCSS = ()=> {
    document.body.style.overflow = 'auto';
    document.body.classList.remove('blurred');
  }

  const toggleUnapprovedSection = () => {
    setUnapprovedSectionOpen(!isUnapprovedSectionOpen);
  }

  const toggleCustomersSection = () => {
    setIsCustomersOpen(!isCustomersOpen);
  }

  const toggleAllReservations = () => {
    setAllReservationsOpen(!isAllReservationsOpen);
  }

  const handleCancelReservation = (appointment) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this reservation?');

    if(confirmCancel) {
      const appointmentId = appointment.id;
      axios.delete(`${domain}/admin/cancelReservation/${appointmentId}`, {
      headers: { 
        Authorization: `Bearer ${jwtToken}`,
      }
    })
    .then(response => {
      if(response && response.status === 200) {
        alert('Appointment canceled successfully. a cancelation email was sent to the customer.');
        setRefresh(!refresh);
      }
    })
    .catch(error => {
      // console.log('Error canceling appointment:', error);
      alert('Error canceling appointment:', error);

    });
    }
  }

  const handleDeleteCustomer = (customer) => {
    const confirmCancel = window.confirm('Are you sure you want to delete this customer?');

    if(confirmCancel) {
      const customerId = customer.id;
      axios.delete(`${domain}/admin/deleteCustomer/${customerId}`, {
      headers: { 
        Authorization: `Bearer ${jwtToken}`,
      }
    })
    .then(response => {
      if(response && response.status === 200) {
        alert('Customer was deleted successfully.');
        setRefresh(!refresh);
      }
    })
    .catch(error => {
      // console.log('Error canceling appointment:', error);
      alert('Error deleting customer:', error);

    });
    }
  }

  const formatPhoneNumber = (phoneNumber) => {
    // Remove non-numeric characters from the input string
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
  
    // Perform formatting based on the cleaned number
    const formattedPhoneNumber =
      cleanedPhoneNumber.length === 10
        ? cleanedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
        : cleanedPhoneNumber;
  
    return formattedPhoneNumber;
  };

  const handleCustomerSearch = () => {
    let filteredResults = customers;
    console.log(selectedOption)
    if (selectedOption == 'id') {
      console.log('sh', inputSearch)
      filteredResults= filteredResults.filter((customer) => customer.id == inputSearch);
    } else if(selectedOption === 'email') {
      console.log('semai')

      filteredResults= filteredResults.filter((customer) => customer.email == inputSearch);
    } else if(selectedOption === 'phoneNumber') {
      console.log(formatPhoneNumber('0536228600'))
      console.log(formatPhoneNumber('053-622-8600'))
      console.log(formatPhoneNumber('05sddg3-hg6fd22-8600'))

      filteredResults= filteredResults.filter((customer) => customer.phoneNumber == formatPhoneNumber(inputSearch));
    } else if(selectedOption === 'firstName') {
      console.log('fn')

      filteredResults= filteredResults.filter((customer) => customer.firstname == inputSearch);
    } else if(selectedOption === 'lastName') {
      console.log('ln')

      filteredResults= filteredResults.filter((customer) => customer.lastname == inputSearch);
    }
    setFilteredCustomers(filteredResults);
  }

  const handleShowAllCustomers = () => {
    setFilteredCustomers(customers);
  }

  const createCustomersExcelReport = () => {
    createExcel(customers, 'all-customers-report');
  }

  const handleAcceptReservation = (appointment) => {
    const appointmentId = appointment.id;
    // console.log(appointmentId);
    
    const reqData = { appointmentId }
    axios.post(`${domain}/admin/acceptReservation/`, reqData, {
      headers: { 
        Authorization: `Bearer ${jwtToken}`,
      }
    })
    .then(response => {
      if(response && response.status === 200) {
        alert('Appointment accepted successfully. a confirmation email was sent to the customer');
        setRefresh(!refresh);
      }
    })
    .catch(error => {
      // console.log('Error canceling appointment:', error);
      alert('Error accepting appointment:', error);

    });
  }

  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Intl.DateTimeFormat('en-IL', options).format(new Date(dateString));
  }

  const handleCancelOrAccept = (appointment) => {
    if(appointment.approvedByAdmin) {
      handleCancelReservation(appointment);
    }
    else {
      handleAcceptReservation(appointment);
    }
  }
    
    return ( 
    <div className="admin-content">
      <Modal
        isOpen={isLoginModalOpen}
        overlayClassName="ModalOverlay"
        className="modal"
      >
        <div>
          <h2>Oops, looks like you haven't logged in yet!</h2>
          {/* Add login and sign-up components or buttons here */}
          <button onClick={() => 
            {
              returnToNormalCSS();
              navigation.push('/admin/login');
              }}>Log in as admin</button>
          <button onClick={() => 
          {
            returnToNormalCSS();
            navigation.push('/');
            }}>HomePage</button>

        </div>
      </Modal>

      <div className="customers-view">

      </div>

      <div className="reservations-to-approve">
          <h3>
            <button onClick={toggleUnapprovedSection}>{isUnapprovedSectionOpen ? '-': '+'}</button>
            Reservations Awaiting for Approvement...
          </h3>
          {isUnapprovedSectionOpen && appointments
            .filter((appointment) => !appointment.approvedByAdmin) 
            .map((appointment, index) => (
              <div key={index}>
                <div className="full-details">
                  <div className="appointment-details">
                    <h4>Appointment details</h4>
                    <p>Date: {new Date(appointment.date).toDateString()}</p>
                    <p>Treatment: {appointment.treatment.name}</p>
                    <p>Duration: {appointment.treatment.durationMinutes} minutes</p>
                  </div>
                  <div className="customerDetails">
                    <h4>Customer's Info</h4>
                    <p>Full Name: {appointment.customer.fullName}</p>
                    <p>Id: {appointment.customer.id}</p>
                    <p>Phone Number: {appointment.customer.phoneNumber}</p>
                    <p>Customer's Notes: {appointment.notes}</p>
                  </div>
                </div>
                <div className="buttons-container">
                  <button onClick={()=> handleAcceptReservation(appointment)}>Accept Reservation</button>
                  <button onClick={()=> handleCancelReservation(appointment)}>Cancel Reservation</button>
                </div>
                <hr />
              </div>
            ))}
      </div>

      <div className="all-reservations">
        <h3>
            <button onClick={toggleAllReservations}>{isAllReservationsOpen ? '-': '+'}</button>
            All Reservations
        </h3>
        {isAllReservationsOpen && (
          <div className="appointments-view">
            <div className="filtering">
              <div className="filtering-card">
                <h4>Filter by ...</h4>
                <label className="filtering-label">all reservations <input type="checkbox" checked={watchAllAppointments} onChange={handleWatchAll} /></label>
                <label className="filtering-label">filter by date <input type="checkbox" checked={filterDate} onChange={handleFilterByDate} disabled={watchAllAppointments} /></label>
                <div className="date-container">
                  <label className="filtering-label">
                    From date: 
                    <input type="date" onChange={(event)=> handleChangeFromDate(event)} disabled={!filterDate} />
                  </label>
                  <label className="filtering-label">
                    To date: 
                    <input type="date" onChange={(event)=> handleChangeToDate(event)} disabled={!filterDate} min={fromDate} />
                  </label>
                </div>
                <div className="approved">
                  <label className="filtering-label">show confirmed reservations <input type="checkbox" checked={filterApproved} onChange={handleFilterApproved} disabled={watchAllAppointments} /></label>
                  <label className="filtering-label">show unapproved reservations <input type="checkbox" checked={filterUnapproved} onChange={handleFilterUnapproved} disabled={watchAllAppointments} /></label>
                  <button onClick={handleFilterChange}>Apply Filters</button>
                  <button onClick={handleCreateAppointmentsExcel}>download excel report</button>
                </div>
                

              </div>
            </div>
            <div className="appointments-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Treatment Name</th>
                    <th>Duration (mins)</th>
                    <th>Full Name</th>
                    <th>ID</th>
                    <th>Phone Number</th>
                    <th>Confirmed</th>
                    <th>Customer Notes</th>
                    <th>Cancel/Accept</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment, index) => (
                    <tr key={index}>
                      <td>{formatDate(appointment.date)}</td>
                      <td>{appointment.treatment.name}</td>
                      <td>{appointment.treatment.durationMinutes}</td>
                      <td>{appointment.customer.fullName}</td>
                      <td>{appointment.customer.id}</td>
                      <td>{appointment.customer.phoneNumber}</td>
                      <td>{appointment.approvedByAdmin ? 'Yes' : 'No'}</td>
                      <td>{appointment.notes}</td>
                      <td>
                        {new Date(appointment.date) >= new Date() && (
                            <button className="inside-table-button" onClick={()=> handleCancelOrAccept(appointment)}>
                            {appointment.approvedByAdmin ? 'Cancel' : 'Accept'}
                            </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
        )}
        

      </div>

      <div className="customers">
        <h3>
            <button onClick={toggleCustomersSection}>{isCustomersOpen ? '-': '+'}</button>
            Customers
        </h3>
        {isCustomersOpen && (
          <div className="customers-view">
            <div className="filtering">
              <div className="filtering-card">
                <h4>Search by ...</h4>
                <div className="searching">
                  <select id="selectField" value={selectedOption} onChange={handleSelectChange}>
                    <option value="">Select an option</option>
                    <option value="id">Id</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="phoneNumber">Phone Number</option>
                    <option value="email">Email</option>
                  </select>
                  <input
                    type="text"
                    value={inputSearch}
                    onChange = {(e)=> setInputSearch(e.target.value)}
                  />
                </div>
                <button onClick={handleCustomerSearch}>Search!</button>
                <button onClick={handleShowAllCustomers}>show all customers</button>
                <button onClick={createCustomersExcelReport}>download all cusstomers excel report</button>
              </div>
            </div>
            <div className="customers-table">
            <div className="appointments-table">
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>ID</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Birthday</th>
                    <th>Delete Customer</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer, index) => (
                    <tr key={index}>
                      <td>{customer.firstname}</td>
                      <td>{customer.lastname}</td>
                      <td>{customer.phoneNumber}</td>
                      <td>{customer.id}</td>
                      <td>{customer.gender}</td>
                      <td>{customer.email}</td>
                      <td>{formatDate(customer.birthday)}</td>
                      <td>
                        <button className="inside-table-button" onClick={()=> handleDeleteCustomer(customer)}> 
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        )}
      </div>


    </div>
   );
}
 
export default Admin;
