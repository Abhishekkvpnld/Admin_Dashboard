
# Admin Dashboard

This **Admin Dashboard** project is a web application designed for managing users efficiently. It features essential functionalities like user management, JWT-based authentication, search, and filtering. The application is built using modern web technologies to ensure scalability and responsiveness.

---

## 🚀 **Technologies Used**

### Frontend:
- **React**: For building a dynamic and responsive user interface.
- **Tailwind CSS**: For designing and styling with utility-first CSS classes.

### Backend:
- **Node.js**: For building the server-side logic.
- **Express.js**: For handling API endpoints and middleware.

### Database:
- **MongoDB**: For managing and storing application data.

---

## ✨ **Features**
1. **User Management:**
   - Add, edit, delete, and view users.
   - Assign roles (Admin/User).
   - Update user status (Active/Inactive).

2. **Authentication:**
   - Secure login using **JWT (JSON Web Token)**.
   - Logout functionality to end the session.

3. **Search and Filter:**
   - Search users by username or email.
   - Filter users based on role, status, or creation date.

4. **Responsive Design:**
   - Optimized for all screen sizes using Tailwind CSS.

## 🛠️ **Setup Instructions**

### Prerequisites:
- **Node.js** and **npm** installed
- **MongoDB** running locally or on the cloud

### Installation:
1. Clone the repository:
   ```bash
   git clone https://github.com/Abhishekkvpnld/Admin_Dashboard.git
   ```
2. Navigate to the project folder:
   ```bash
   cd admin-dashboard
   ```
3. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```
4. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application:
1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
2. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```
3. Open the application in your browser

---

## 🔐 **Authentication**
The application uses **JWT (JSON Web Token)** for secure user authentication:
- Tokens are generated upon login and validated for subsequent requests.
- User credentials are encrypted and securely stored.

---

## 🌟 **Future Enhancements**
- Add advanced filtering and sorting options.
- Implement role-based access control for enhanced security.
- Integrate data visualization for better insights.



## 🤝 **Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push the changes:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.
