import express from 'express';

import * as EventsController from '../../controllers/events_controller'
import * as UsersController from '../../controllers/users_controller'
import * as CategoriesController from '../../controllers/categories_controller'

const router = express.Router();


router.route('/categories')
  .post(CategoriesController.create)
  /**
   * @api {GET} /categories/ Get list of categories
   * @apiVersion 0.0.1
   * @apiName ListCategories
   * @apiGroup Category
   * @apiPermission anon
   *
   * @apiDescription This call will fetch the categories
   * @apiSampleRequest http://hobbyhub8.herokuapp.com/api/categories/
   *
   * @apiSuccess {Category} Category List of he Category object
   * @apiSuccessExample {json} Successful Category Response
   *   HTTP/1.1 200 OK
   *    [
   *        {
   *          _id: "5817737edcba0f01c12ef580",
   *          name: "sport"
   *        },
   *        {
   *          _id: "581773afdcba0f01c12ef58d",
   *          name: "board games"
   *        },
   *        ...
   *   ]
   *
   */
  .get(CategoriesController.index);

router.route('/categories/:categoryId')
  /**
   * @api {GET} /categories/:categoryId Get the specific category
   * @apiVersion 0.0.1
   * @apiName GetCategory
   * @apiGroup Category
   * @apiPermission anon
   *
   * @apiDescription This call will fetch the category by id
   * @apiSampleRequest http://hobbyhub8.herokuapp.com/api/categories/:categoryId
   *
   * @apiSuccess {Category} Category The Category object
   * @apiSuccessExample {json} Successful Category Response
   *   HTTP/1.1 200 OK
   *    {
   *      _id: "5817737edcba0f01c12ef580",
   *      name: "sport"
   *    }
   *
   * @apiError EventNotFound The <code>categoryId</code> of a Category has not been found
   */
  .get(CategoriesController.show);

router.route('/events')
  /**
   * @api {POST} /events/ Create a new event
   * @apiVersion 0.0.1
   * @apiName CreateEvent
   * @apiGroup Event
   * @apiPermission authenticatedUser
   *
   * @apiDescription This call will create a new event
   * @apiSampleRequest http://hobbyhub8.herokuapp.com/api/events/
   *
   * @apiParamExample {json} Request-Example:
   *     {
   *       "name": "eventName",
   *       "organizer": "bob@bob.bob"
   *       "description": "This is the coolest event ever";
   *       "categories": [
   *        "sport", "football", "nonexistentCategory"
   *       ],
   *       "start": 1478623941,
   *       "end": 1478623941,
   *       "address": "Vodičkova 25, Praha",
   *       "minPeople": 2,
   *       "maxPeople": 8
   *     }
   *
   * @apiSuccess {Event} Event The Event object
   * @apiSuccessExample {json} Successful Event Response
   *    HTTP/1.1 200 OK
   *    {
   *      "name": "eventNameString"
   *      "organizer": {
   *        "email": "bob@bob.bob,
   *        "firstName": "bob",
   *        ...
   *      },
   *      "description": "This is the coolest event ever",
   *      "categories": [
   *        "sport", "football"
   *      ],
   *      "start": 1478623941,
   *      "end": 1478623941,
   *      "address": "Vodičkova 25, Praha",
   *      "minPeople": 2,
   *      "maxPeople": 8,
   *      "attendees": []
   *      "comments": []
   *    }
   *
   * @apiError EventNotFound The <code>eventId</code> of an Event has not been found
   */
  .post(EventsController.create)
  .get(EventsController.index);

router.route('/events/:eventId')
  /**
   * @api {GET} /events/:eventId Read data of event
   * @apiVersion 0.0.1
   * @apiName GetEvent
   * @apiGroup Event
   * @apiPermission anon
   *
   * @apiDescription This call will fetch an event specified by the event id
   * @apiSampleRequest http://hobbyhub8.herokuapp.com/api/events/:eventId
   *
   * @apiSuccess {Event} Event The Event object
   * @apiSuccessExample {json} Successful Event Response
   *    HTTP/1.1 200 OK
   *    {
   *      "name": "eventNameString"
   *      "organizer": {
   *        "email": "bob@bob.bob,
   *        "firstName": "bob",
   *        ...
   *      },
   *      "description": "This is the coolest event ever",
   *      "categories": [
   *        "sport", "football"
   *      ],
   *      "start": 1478623941,
   *      "end": 1478623941,
   *      "address": "Vodičkova 25, Praha",
   *      "minPeople": 2,
   *      "maxPeople": 8,
   *      "attendees": [
   *        { "email": "jim@jim.com", ... }
   *        ...
   *      ]
   *      "comments": [
   *          {
   *             "author": "87asdkfjc66L,
   *             "authorName": "Bob Smith",
   *             "timestamp": 1478623941,
   *             "text": "Wew.",
   *             "replies": [
   *              { ... },
   *              ...
   *             ]
   *
   *           },
   *           {
   *              ...
   *           },
   *           ...
   *      ]
   *    }
   *
   * @apiError EventNotFound The <code>eventId</code> of an Event has not been found
   */
  .get(EventsController.show);

router.route('/events/:eventId/attendees/:userId')
  /**
   * @api {PUT} /events/:eventId/attendees/:userId Add user as attendee
   * @apiVersion 0.0.1
   * @apiName AttendEvent
   * @apiGroup Event
   * @apiPermission authenticatedUser
   *
   * @apiDescription This call will add the user with specified userId as an attendee of the event
   *
   * @apiError UserNotFound An User with specified <code>userId</code> has not been found
   * @apiError EventNotFound An Event with specified <code>eventId</code> has not been found
   */
  .put(EventsController.attend)
  /**
   * @api {DELETE} /events/:eventId/attendees/:userId Remove user as attendee
   * @apiVersion 0.0.1
   * @apiName LeaveEvent
   * @apiGroup Event
   * @apiPermission authenticatedUser
   *
   * @apiDescription This call will remove the user with specified userId from the event
   *
   * @apiError UserNotFound An User with specified <code>userId</code> has not been found
   * @apiError EventNotFound An Event with specified <code>eventId</code> has not been found
   */
  .delete(EventsController.leave);

router.route('/users')
  .post(UsersController.create)
  .get(UsersController.index);

router.route('/users/:userId')
  .get(UsersController.show);


router.route('/users/auth')
  /**
   * @api {POST} /users/auth Authenticates user credentials
   * @apiVersion 0.0.1
   * @apiName AuthUser
   * @apiGroup User
   * @apiPermission anon
   *
   * @apiDescription This call will attempt to authenticate User with given credentials and return its entire object on success
   * @apiParamExample {json} Request-Example:
   *     {
   *       "email": "bob@bob.bob",
   *       "password": "myplaintextpassword"
   *     }
   *
   * @apiSuccess {User} User The User object
   * @apiSuccessExample {json} Successful User Response
   *    HTTP/1.1 200 OK
   *    {
   *      "email": "bob@bob.bob",
   *      "firstName": "bob",
   *      "lastName": "bob",
   *      "pictureUrl": "placehold.it/100x100",
   *      "introduction": "Hi, I'm bob.",
   *      "phone": "+42012356789"
   *    }
   *
   * @apiError InvalidCredentials Provided credentials were not valid
   */
  .post(UsersController.auth);

export default router;
