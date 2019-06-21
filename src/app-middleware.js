import express from 'express';
import compression from 'compression';

const router = express.Router();

router.use(compression(), (req, res) => {
  res.render('index');
});

export default () => router;
