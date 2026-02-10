🕵️ Mini App - IT342 Lab 1
System Integration and Architecture | User Authentication & Session Management

This project is a secure, stateful authentication system built with Spring Boot and ReactJS. Credentials are encrypted using BCrypt and sessions are managed via HttpSession with protected server-side verification.

🛠️ Tech Stack
Backend: Java 19, Spring Boot, Spring Security.

Frontend: ReactJS, Axios, React Router.

Database: MySQL (userauth_db).

Security: BCrypt Password Hashing, Stateful Sessions (JSESSIONID).

🔒 Security Features
Stateful Authentication: Unlike standard local storage, this system uses HttpSession. The server issues a JSESSIONID cookie upon successful login.

Active Route Guarding: The Dashboard performs a "Credential Scan" on every mount by calling the /api/auth/me endpoint. Access is denied if the session cookie is missing or invalid.

CORS with Credentials: Secure cross-origin communication allows the React frontend (Port 3000) to securely exchange cookies with the Spring Boot API (Port 8080).

Global Redirects: Implemented a wildcard "Security Net" in the router that catches any unauthorized or non-existent URLs and redirects users to the login terminal.

Session Termination: An explicit Logout function invalidates the session on the server side and wipes local account data.

🚀 Getting Started
1. Backend Setup
Configure your application.properties with your MySQL credentials.

Run the Spring Boot application.

2. Frontend Setup
Navigate to the /web directory.

Install dependencies: npm install.

Launch the terminal: npm start.

Developed by: Tapales, Christian Kyle | IT342 Section G2
