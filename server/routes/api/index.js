import express from 'express';
import User from '../../models/user.js';
import Event from '../../models/event.js';

const router = express.Router();

router.route('/events')
  .get((req, res, next) => {
    Event.find((err,events) => {
      if(err){
          res.send(err);
        }
      res.json(events);
    })
  })

router.route('/events/:event_id')
  .get((req, res, next) => {
    Event.findById(req.params.event_id, (err, event) => {
        if (err){
            res.send(err);
          }
        res.json(event);
        })
    })

router.route('/users')
  .get((req, res, next) => {
    User.find((err,users)=> {
        if(err){
            res.send(err);
          }
        res.json(users);
        })
    })

router.route('/users/:user_id')
  .get((req, res, next) => {
    User.findById(req.params.user_id, (err, user) => {
        if (err){
            res.send(err);
          }
        res.json(user);
        })
    })

export default router;
