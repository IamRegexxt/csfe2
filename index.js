// index.js

// Import required modules
const express = require('express');
const dbConfig = require('./config/db.config');
const authConfig = require('./config/auth.config');
const authTokenMiddleware = require('./middleware/authToken');

// Create Express application
const app = express();

// Configure database
dbConfig.connect();

// Configure authentication
authConfig.setup();

// Middleware setup
app.use(authTokenMiddleware);

// Define routes
const indicatorRoutes = require('./routes/Indicator');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const rolesRoutes = require('./routes/Roles');
const usersRoutes = require('./routes/Users');

app.use('/api/indicator', indicatorRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/users', usersRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
