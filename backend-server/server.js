const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks'); // Importing task routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

app.use('/api', taskRoutes); // Use task routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
