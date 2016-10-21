import express from 'express';

const router = express.Router();

const mockEvents = [
  {
    id: 1,
    name: 'Fotbalek'
  }, {
    id: 2,
    name: 'D&G'
  }
];

router.route('/events')
  .get((req, res, next) => {
    res.json(mockEvents);
  })

export default router;