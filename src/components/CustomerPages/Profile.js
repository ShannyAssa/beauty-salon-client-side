import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './Profile.css';
import Modal from 'react-modal';

const Profile = ({domain}) => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState();
  const [treatments, setTreatments] = useState([]);
  const [selectedDateEvent, setSelectedDateEvent] = useState('');
  const [isHistorySectionOpen, setHistorySectionOpen] = useState(false);
  const [isUnapprovedSectionOpen, setUnapprovedSectionOpen] = useState(false);
  const [isPersonalInfoSectionOpen, setPersonalSectionOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  // new reservation useStates :
  const [isNewReservationModalOpen, setReservationModalOpen] = useState(false);
  const [reservationDate, setReservationDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [durationAndPrice, setDurationAndPrice] = useState({});
  const [notes, setNotes] = useState('');
  const chooseFromBelow = 'Choose from below';
  const [refresh, setRefresh] = useState(false);

  const onChange = (date) => {
    const event = events.find(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );
    if(event) {
      setSelectedDateEvent(event);
    }
    else {
      setSelectedDateEvent('');
    }
    setReservationDate(date);

  };

  const eventTileContent = ({ date, view }) => {
    if (view === 'month' && events) {
      const event = events.find(
        (event) => new Date(event.date).toDateString() === date.toDateString()
      );
      return event ? <div className="event-dot">●</div> : null;
    }
    return null;
  };

  const navigation = useHistory();

  const jwtToken = localStorage.getItem('token');

   useEffect(() => {
    axios.get(`${domain}/MyProfile/getUserInformation`, {
      headers: { 
        Authorization: `Bearer ${jwtToken}`,
       }
      })
      .then(response => {
        returnToNormalCSS();
        setUser(response.data.currentCustomer);
        setEvents(response.data.customerAppointments);
        setTreatments(response.data.allTreatments);
        const todayEvent = response.data.customerAppointments.find(
          (event) => new Date(event.date).toDateString() === new Date().toDateString()
        );
        if (todayEvent) {
          setSelectedDateEvent(todayEvent);
        }
      })
      .catch(error => {
        // console.error('Error fetching user details:', error);
        setLoginModalOpen(true);
        document.body.style.overflow = 'hidden';
        document.body.classList.add('blurred');
        const modalElement = document.querySelector('.modal');
        if(modalElement) {
          modalElement.style.filter = 'none !important';
        }
      });
  }, [jwtToken, navigation, refresh]);

  const toggleHistorySection = () => {
    setHistorySectionOpen(!isHistorySectionOpen);
  };

  const toggleUnapprovedSection = () => {
    setUnapprovedSectionOpen(!isUnapprovedSectionOpen);
  }

  const returnToNormalCSS = ()=> {
    document.body.style.overflow = 'auto';
    document.body.classList.remove('blurred');
  }

  const openNewReservationModal = () => {
    setReservationModalOpen(true);
    // console.log('clicked');
  }

  const closeNewReservationModal = ()=> {
    setReservationModalOpen(false);
    emptyAllFields();
  }

  const handleDateChange = (event) => {
    setReservationDate(new Date(event.target.value));
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const makeNewReservation = () => {
    if(!selectedTime && !selectedTreatment) {
      alert('You must fill the date, time & treatment fields');
      return;
    }

    if(reservationDate < new Date()) {
      alert('Choose a date that has not already occurred!');
      return;
    }

    const formattedDate = new Date(
      `${reservationDate.toISOString().split('T')[0]}T${selectedTime}`
    );
  
    const requestData = {
      date: formattedDate.toISOString(),
      treatmentName: selectedTreatment,
      treatmentDuration: durationAndPrice.duration,
      notes: notes,
    };

    // console.log('token ' , jwtToken);

    axios.post(`${domain}/MyProfile/makeReservation`, requestData, {
      headers: { 
        Authorization: `Bearer ${jwtToken}`,
       }
      })
      .then(response => {
        alert('Appointment created successfully');
        setReservationModalOpen(false);
        emptyAllFields();
        setRefresh(!refresh);
      })
      .catch(error => {
        console.log('Error creating appointment:', error);
      });
    
    setReservationModalOpen(false);
  }

  const handleTreatmentChange = (event) => {
    const currentTreatmentName = event.target.value;
    if(currentTreatmentName === chooseFromBelow) {
      setSelectedTreatment('');
      setDurationAndPrice({});
    }
    else {
      setSelectedTreatment(currentTreatmentName);
      treatments.map(treatment => {
        if(treatment.name === currentTreatmentName) {
          setDurationAndPrice({duration: treatment.durationMinutes, price: treatment.price})
        }
      })
    }
  }

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const emptyAllFields = () => {
    setSelectedTime('');
    setSelectedTreatment('');
    setDurationAndPrice({});
    setNotes('');
  }

  const handleCancelAppointment = (event) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this reservation?');

    if(confirmCancel) {
      const appointmentId = event._id;
      // console.log(appointmentId);
      axios.delete(`${domain}/MyProfile/cancelReservation/${appointmentId}`, {
      headers: { 
        Authorization: `Bearer ${jwtToken}`,
      }
    })
    .then(response => {
      if(response && response.status === 200) {
        alert('Appointment canceled successfully');
        setRefresh(!refresh);
      }
    })
    .catch(error => {
      // console.log('Error canceling appointment:', error);
      alert('Error canceling appointment:', error);

    });
    }
  }

  const togglePersonalInfoSection = () => {
    setPersonalSectionOpen(!isPersonalInfoSectionOpen);
  }

  return (
    <div className="profile-content">
      <Modal
        isOpen={isLoginModalOpen}
        overlayClassName="ModalOverlay"
        className="modal"
      >
        <div>
          <h2>In order to watch your profile, you must log in or sign up first</h2>
          {/* Add login and sign-up components or buttons here */}
          <button onClick={() => 
            {
              returnToNormalCSS();
              navigation.push('/beauty-salon-client-side/login');
              }}>Login</button>
          <button onClick={() => 
            {
              returnToNormalCSS();
              navigation.push('/beauty-salon-client-side/signup');
              }}>Sign Up</button>
          <button onClick={() => 
          {
            returnToNormalCSS();
            navigation.push('/beauty-salon-client-side/');
            }}>HomePage</button>

        </div>
      </Modal>
      
      <div className={`blurred-background-${isLoginModalOpen ? 'active' : ''}`}>
        <div className="personal-info">
          <h3>
            <button onClick={togglePersonalInfoSection}>{isPersonalInfoSectionOpen ? '-': '+'}</button>
            Personal Information
          </h3>
          {isPersonalInfoSectionOpen && (
            <div className="info">
              <label className="info-labels">
                First Name:
                <input type="text" value={user.firstname} disabled />
              </label>
              <label className="info-labels">
                Last Name:
                <input type="text" value={user.lastname} disabled />
              </label>
              <label className="info-labels">
                Id:
                <input type="text" value={user.id} disabled />
              </label>
              <label className="info-labels">
                Username:
                <input type="text" value={user.username} disabled />
              </label>
              <label className="info-labels">
                Gender:
                <input type="text" value={user.gender} disabled />
              </label>
              <label className="info-labels">
                Email:
                <input type="email" value={user.email} disabled />
              </label>
              <label className="info-labels">
                Phone Number:
                <input type="tel" value={user.phoneNumber} disabled />
              </label> 
              
            </div>
          )}
          
        </div>

        <div className="upcoming-events">
          <h3>Your Next Reservation...</h3>
          {events
            .filter((event) => new Date(event.date) >= new Date()) // Filter events in the future
            .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort events by date in ascending order
            .slice(0, 1) // Take only the first event (nearest upcoming event)
            .map((event, index) => (
              <div key={index}>
                <p>Date & Time: {new Date(event.date).toLocaleString('en-IL', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                <p>Treatment: {event.treatment.name}</p>
                <p>Duration: {event.treatment.durationMinutes} minutes</p>
                <p>Approved by admin: {event.approvedByAdmin ? 'Yes' : 'No'}</p>
                <p>Notes: {event.notes}</p>
                <hr />
              </div>
            ))}
        </div>
        
        <div className="calendar-section">
          <div className="calender-and-button">
            <Calendar
              onChange={onChange}
              value={new Date()}
              tileContent={eventTileContent}
              locale="en-US"
            />
            
            <button onClick={openNewReservationModal}>Make A New Reservation</button>
            <Modal
              className="make-reservation-modal"
              isOpen={isNewReservationModalOpen}
              > 
              <h3>Make a new reservation!</h3>

              <label className="label-group">
                Date:
                <input type="date" name="date" value={reservationDate.toISOString().split('T')[0]} onChange={handleDateChange} required />
              </label>
              <label className="label-group">
                Time:
                <input type="time" name="time" value={selectedTime} onChange={handleTimeChange} required />
              </label>
              <label className="label-group">
                Treatment:
                <select value={selectedTreatment} onChange={handleTreatmentChange}>
                  <option>{chooseFromBelow}</option>
                {treatments.map(treatment => (
                  <option key={treatment.name} value={treatment.name}>
                    {treatment.name}
                  </option>
                ))}
                </select>
              </label >
              {selectedTreatment && (
                <div className="treatments-info">
                  <p>Duration: {durationAndPrice.duration} minutes    </p>
                  <p>Price: {durationAndPrice.price} USD</p>
                </div>
              )}
              <label className="label-group">
                Notes:
                <input value={notes} onChange={handleNotesChange}></input>
              </label>

              <button onClick={makeNewReservation}>Reserve now!</button>
              <button onClick={closeNewReservationModal}>Cancel</button>
            </Modal>
          </div>

          <div className="event-details">
            <h3>Reservation Details</h3>
            {selectedDateEvent && (
              <div>
                <p>Date & Time: {selectedDateEvent.date ? new Date(selectedDateEvent.date).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}) : ''}</p>
                <p>Treatment: {selectedDateEvent.treatment.name}</p>
                <p>Duration: {selectedDateEvent.treatment.durationMinutes} minutes</p>
                <p>Notes: {selectedDateEvent.notes}</p>
              </div>
            )}
            {!selectedDateEvent && (<p>There is no reservation on the selected date</p>)}
          </div>

          
        </div>
        
        <div className="events-to-approve">
          <h3>
            <button onClick={toggleUnapprovedSection}>{isUnapprovedSectionOpen ? '-': '+'}</button>
            Reservations Awaiting for Approvement...
          </h3>
          {isUnapprovedSectionOpen && events
            .filter((event) => !event.approvedByAdmin) 
            .map((event, index) => (
              <div key={index}>
                <p>Date: {new Date(event.date).toDateString()}</p>
                <p>Treatment: {event.treatment.name}</p>
                <p>Duration: {event.treatment.durationMinutes} minutes</p>
                <p>Notes: {event.notes}</p>
                <button onClick={()=> handleCancelAppointment(event)}>Cancel Appointment</button>
                <hr />
              </div>
            ))}
        </div>

        <div className="events-history">
          <h3>
            <button className="history-button" onClick={toggleHistorySection}>
              {isHistorySectionOpen ? '-' : '+'}
            </button>
              Reservations History
          </h3>

          {isHistorySectionOpen && events
          .filter(
            (event) =>
              event.approvedByAdmin && new Date(event.date) < new Date()
          )
          .map(
            (event, index) => (
              <div key={index}>
                <p>Date: {new Date(event.date).toDateString()}</p>
                <p>Treatment: {event.treatment.name}</p>
                <p>Duration: {event.treatment.durationMinutes} minutes</p>
                <p>Approved by admin: {event.approvedByAdmin ? 'Yes' : 'No'}</p>
                <p>Notes: {event.notes}</p>
                <hr />
              </div>
          ))}
        </div>

      </div>

      

    </div>
  );
};

export default Profile;
