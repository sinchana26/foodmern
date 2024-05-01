require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const detailsRoutes = require("./routes/details");

// Initialize express app
const app = express();

// Database connection
connection();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/details", detailsRoutes);

// Root message route
app.get("/", (req, res) => {
  res.send("Hello,server connected to https");
});

// SSL/TLS certificates
const privateKeyPath = 'C:/Users/sinch/OneDrive/Desktop/Final_MERN/client/localhost+2-key.pem';
const certificatePath = 'C:/Users/sinch/OneDrive/Desktop/Final_MERN/client/localhost+2.pem';

// Check if certificate and private key files exist
if (!fs.existsSync(privateKeyPath) || !fs.existsSync(certificatePath)) {
  console.error("SSL certificate or private key file not found!");
  process.exit(1);
}

// Read certificate and private key files
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');

// HTTPS server options
const credentials = { key: privateKey, cert: certificate };

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// Set port
const port = process.env.PORT || 8080;

// Start HTTPS server
httpsServer.listen(port, () => {
  console.log(`HTTPS Server listening on port ${port}...`);
});
