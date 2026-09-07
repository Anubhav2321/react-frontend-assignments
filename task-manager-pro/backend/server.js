import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Placeholder endpoint for Groq API auto-suggest logic
app.post('/api/groq-suggest', (req, res) => {
  const { description } = req.body;
  
  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  // TODO: Integrate actual Groq API here.
  // This is a placeholder logic for suggesting category and priority.
  let suggestedPriority = 'Medium';
  let suggestedCategory = 'General';

  const descLower = description.toLowerCase();
  
  if (descLower.includes('urgent') || descLower.includes('asap') || descLower.includes('high')) {
    suggestedPriority = 'High';
  } else if (descLower.includes('later') || descLower.includes('low') || descLower.includes('maybe')) {
    suggestedPriority = 'Low';
  }

  if (descLower.includes('bug') || descLower.includes('fix') || descLower.includes('code')) {
    suggestedCategory = 'Development';
  } else if (descLower.includes('design') || descLower.includes('ui') || descLower.includes('ux')) {
    suggestedCategory = 'Design';
  } else if (descLower.includes('meeting') || descLower.includes('call')) {
    suggestedCategory = 'Communication';
  }

  res.json({
    suggestedPriority,
    suggestedCategory
  });
});

// Database connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskmanagerpro';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
