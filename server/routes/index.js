import express from 'express';

const router = express.Router();

router.route('/api')
  .get((req, res, next) => {
    res.send('Hello world!');
  })

export default router;