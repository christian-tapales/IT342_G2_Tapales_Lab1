# 🕵️ MINI APP
### *System Integration and Architecture | IT342 Lab 1*

---

## 📂 PROJECT OVERVIEW
> This project is a secure, **stateful authentication system** built with Spring Boot and ReactJS. Credentials are encrypted via `BCrypt` and sessions are strictly managed via `HttpSession` with protected server-side verification.

---

## 🛠️ TECH STACK

| LAYER | TECHNOLOGY |
| :--- | :--- |
| **Backend** | `Java 19`, `Spring Boot`, `Spring Security` |
| **Frontend** | `ReactJS`, `Axios`, `React Router` |
| **Database** | `MySQL` (userauth_db) |
| **Security** | `BCrypt Hashing`, `Stateful Sessions (JSESSIONID)` |

---

## 🔒 SECURITY FEATURES

### 📡 **Stateful Authentication**
* Unlike standard local storage, this system uses `HttpSession`. 
* The server issues a `JSESSIONID` cookie upon successful login to track the active agent.

### 🛡️ **Active Route Guarding**
* The Dashboard performs a **"Credential Scan"** on every mount by calling the `/api/auth/me` endpoint.
* Access is strictly denied if the session cookie is missing, invalid, or expired.

### 🔑 **CORS with Credentials**
* Secure cross-origin communication allows the React frontend (Port 3000) to securely exchange cookies with the Spring Boot API (Port 8080).

### 🛰️ **Global Redirects**
* Implemented a wildcard **"Security Net"** in the router (`path="*"`) that catches any unauthorized or non-existent URLs and redirects users to the login terminal.

### 🛑 **Session Termination**
* An explicit **Logout** function invalidates the session on the server side (`session.invalidate()`) and wipes local agent data.



---

## 🚀 GETTING STARTED

### ⚙️ **1. Backend Setup**
1. Open `src/main/resources/application.properties`.
2. Configure your **MySQL credentials**.
3. Run the **Spring Boot** application through your IDE or terminal.

### 🎨 **2. Frontend Setup**
1. `cd web` (Navigate to the React directory).
2. `npm install` (Install required agent dependencies).
3. `npm start` (Launch the Mini App).

---

## 👤 DEVELOPER IDENTITY
> **NAME:** Tapales, Christian Kyle  
> **COURSE:** IT342 - System Integration and Architecture  
> **SECTION:** G2
