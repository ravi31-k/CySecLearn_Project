# CySecLearn_Project
github.com/malviyaravi/CySecLearn_Project


# Project Setup and Running Instructions

## Prerequisites

Before you start, ensure that you have the following installed:
- [Node.js](https://nodejs.org/) (which includes npm)
- [OWASP ZAP](https://www.zaproxy.org/)

## Steps to Run This Code in VSCode

### 1. Install Dependencies for Realtime Editor

To set up the environment for the `realtimeeditor`, follow these steps:

1. **Navigate to the Realtime Editor Directory:**
   - Open your terminal in VSCode.
   - Change to the `main/frontend/realtimeeditor` directory:
     ```bash
     cd main/frontend/realtimeeditor
     ```

2. **Install Dependencies:**
   - Run the following command to install all required Node.js dependencies:
     ```bash
     npm install
     ```

### 2. Set Up OWASP ZAP

OWASP ZAP is used for security scanning. Follow these steps to configure and run ZAP:

1. **Download and Install OWASP ZAP:**
   - Visit the [OWASP ZAP Downloads Page](https://www.zaproxy.org/download/) and choose the appropriate version for your operating system.
   - Follow the installation instructions provided.

2. **Run OWASP ZAP in Daemon Mode:**
   - Open a terminal window and run OWASP ZAP in daemon mode using the following command:
     ```bash
     zap.sh -daemon
     ```
   - Alternatively, you might use `zap.bat` on Windows or the appropriate executable for your OS.

3. **Configure ZAP API Key:**
   - Before running ZAP in daemon mode, you need to configure the ZAP API key in your project.
   - Open the `zapscan.py` file located in your project directory.
   - Locate the section where the ZAP API key is required and add your ZAP API key. This is usually done by modifying a line such as:
     ```python
     api_key = 'your_zap_api_key'
     ```

### 3. Start the Application

To get the application up and running, follow these steps:

1. **Start the Main Application:**
   - In your terminal, navigate to the `main` directory:
     ```bash
     cd main
     ```
   - Start the application with:
     ```bash
     npm start
     ```

2. **Start the Frontend:**
   - Open a new terminal tab or window and navigate to the `frontend` directory:
     ```bash
     cd main/frontend
     ```
   - Start the frontend application with:
     ```bash
     npm start
     ```

3. **Start the Realtime Editor:**
   - In another terminal tab or window, navigate to the `realtimeeditor` directory:
     ```bash
     cd main/frontend/realtimeeditor
     ```
   - Run the following command:
     ```bash
     npm start
     ```

### 4. Configure Database Connection

Ensure that your application can connect to the database:

1. **Locate the `connection.js` File:**
   - Open the `connection.js` file found in your project directory.

2. **Configure Database Connection:**
   - Update the file with the appropriate database connection details such as host, port, username, password, and database name. The configuration might look like this:
     ```javascript
     module.exports = {
       host: 'localhost',
       port: 5432,
       user: 'your_username',
       password: 'your_password',
       database: 'your_database_name'
     };
     ```

## Troubleshooting

- **OWASP ZAP Issues:**
  - Ensure that ZAP is properly installed and that there are no network issues blocking its connection.

- **Application Not Starting:**
  - Verify that all dependencies are installed and that there are no syntax errors in your code.

- **Database Connection Problems:**
  - Check that the database service is running and that the connection details in `connection.js` are correct.

## Additional Resources

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [OWASP ZAP Documentation](https://www.zaproxy.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)

Feel free to reach out if you have any questions or encounter issues!
github.com/malviyaravi
