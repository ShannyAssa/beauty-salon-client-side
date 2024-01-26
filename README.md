# Heavenly Horizon Beauty Salon and Spa

"Heavenly Horizon Beauty Salon and Spa" is a full-stack application developed using React for the client side and Node.js-Express.js for the server side. This application serves as a secure beauty salon and spa website, providing users with a convenient platform to sign up, schedule appointments, and access various features for a seamless spa experience.

## Features

### For Customers
- **User-Friendly Interface:** The client side of the application boasts an intuitive user interface built with React, ensuring a smooth and engaging experience for customers.
- **Dynamic Appointment Scheduling:** Customers can easily schedule appointments using the dynamic scheduling system.

### For Administrators
- **Reservation Management:** Administrators have the authority to oversee reservations, allowing them to accept or cancel appointments.
- **Filtered Excel Reports:** Administrators can generate filtered Excel reports encompassing appointment and customer details, providing a comprehensive view of the entire system.

## Technologies Used

### Client Side
- **React:** The client side leverages React to deliver a responsive and feature-rich user interface.
- **Third-Party Components:** Integration of third-party components such as a React Calendar and Slider enhances the user experience.

### Server Side
- **Node.js-Express.js:** The backend, powered by Node.js and Express.js, ensures secure and efficient functioning of the application.
- **MongoDB:** MongoDB serves as the database system, storing and managing event details efficiently.

## Security Measures

- **Password Hashing:** Robust security measures, including bcrypt for password hashing, are implemented to safeguard user information.

## Important Notes

- **Authentication:** While standard practice would involve distinct authentication for customers and administrators, this application, not intended for active use, allows open access to the admin side for anyone who views it.
- **Email Functionalities:** Due to constraints on the email sending server, certain functionalities related to the NodeMailer library, such as confirmation/cancellation emails and password reset, are currently unavailable.

Feel free to explore the application and enjoy the seamless beauty salon and spa experience it offers!
