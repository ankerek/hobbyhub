import Event from '../models/event'

export function index(req, res, next) {
  Event.find((err,events) => {
          if(err) {
            return next(err);
          }
        res.json(events);
    })
}

export function create(req, res, next) {
  const event = new Event(req.body);
    event.save((err, event) => {
        if (err) {
          return next(err);
        }
        res.json(event);
    });
}

export function show(req, res, next) {
  Event.findById(req.params.event_id, (err, event) => {
        if (err) {
          return next(err);
        }
        res.json(event);
      })
}
