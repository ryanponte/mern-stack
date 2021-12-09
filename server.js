import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import * as path from 'path';

import { connectDB } from './models/index.js';
import routes from './routes/api/index.js';

const app = express();

app.use(cors());

connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users', routes.users);
app.use('/api/auth', routes.auth);
app.use('/api/profile', routes.profile);
app.use('/api/posts', routes.posts);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        'client',
        'build',
        'index.html'
      )
    );
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);
