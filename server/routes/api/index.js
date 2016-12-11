import express from 'express';

import * as EventsController from '../../controllers/events_controller'
import * as UsersController from '../../controllers/users_controller'
import * as CategoriesController from '../../controllers/categories_controller'

const router = express.Router();


router.route('/categories')
  .post(UsersController.isAuthenticated,CategoriesController.create)
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
   *       "category": "football",
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
   *      "category": "football",
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
  .post(UsersController.isAuthenticated,EventsController.create)
  .get(EventsController.index);

router.route('/events/search')
  /**
   * @api {POST} /events/search Search for an event
   * @apiVersion 0.0.1
   * @apiName EventSearch
   * @apiGroup Event
   * @apiPermission anonymous
   *
   * @apiDescription This call return an array of events based on the payload criteria. NOTE the time: milliseconds unix
   * @apiSampleRequest http://hobbyhub8.herokuapp.com/api/events/search
   *
   * @apiParamExample {json} Request-Example:
   *     {
   *       "categories": ["football", "chess"],
   *       "startBefore": 1512064920000,
   *       "startAfter": 1512064920000,
   *       "full": false,
   *       "empty": true,
   *       "spotsRemaining": 4
   *     }
   *
   * @apiSuccess {Event} Event Array of Event objects
   */
  .post(EventsController.search);

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
   *      "category": "football",
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
  .get(EventsController.show)
  /**
   * @api {PUT} /events/:eventId Update existing event
   * @apiVersion 0.0.1
   * @apiName UpdateEvent
   * @apiGroup Event
   * @apiPermission authenticatedUser (organizer)
   *
   * @apiDescription This call will update an existing event. Note that comments and attendees are ignored. Use the appropriate endpoint for those properties.
   * @apiSampleRequest http://hobbyhub8.herokuapp.com/api/events/:eventId
   *
   * @apiParamExample {json} Request-Example:
   *     {
   *       "name": "eventName",
   *       "description": "This is the coolest event ever";
   *       "category": "football",
   *       "start": 1478623941,
   *       "end": 1478623941,
   *       "address": "Vodičkova 25, Praha",
   *       "minPeople": 2,
   *       "maxPeople": 8
   *     }
   */
  .put(EventsController.update)
  /**
   * @api {DELETE} /events/:eventId Delete existing event
   * @apiVersion 0.0.1
   * @apiName DeleteEvent
   * @apiGroup Event
   * @apiPermission authenticatedUser (organizer)
   *
   * @apiDescription This call will delete an existing event. Note that comments and attendees are ignored. Use the appropriate endpoint for those properties.
   * @apiSampleRequest http://hobbyhub8.herokuapp.com/api/events/:eventId
   *
   */
  .delete(EventsController.destroy);

router.route('/events/:eventId/comments')
  /**
   * @api {POST} /events/:eventId/comments Add comment to event
   * @apiVersion 0.0.1
   * @apiName AddComment
   * @apiGroup Event
   * @apiPermission authenticatedUser
   *
   * @apiDescription This call will add a new comment to event
   * @apiSampleRequest http://hobbyhub8.herokuapp.com/api/events/:eventId/comments
   *
   * @apiParamExample {json} Request-Example:
   *    {
   *      "author": "bob@bob.bob",
   *      "text": "Awsome comment. FACT!"
   *    }
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
   *      "category": "football",
   *      "start": 1478623941,
   *      "end": 1478623941,
   *      "address": "Vodičkova 25, Praha",
   *      "minPeople": 2,
   *      "maxPeople": 8,
   *      "attendees": []
   *      "comments": []
   *    }
   *
   * @apiError UserNotFound The <code>email</code> of an User has not been found
   * @apiError EventNotFound The <code>eventId</code> of an Event has not been found
   */
  .post(UsersController.isAuthenticated,EventsController.addComment);

router.route('/events/:eventId/comments/:commentId/replies/')
  /**
   * @api {POST} /events/:eventId/comments Add simple reply to comment
   * @apiVersion 0.0.1
   * @apiName AddReply
   * @apiGroup Event
   * @apiPermission authenticatedUser
   *
   * @apiDescription This call will add a new comment to event
   * @apiSampleRequest http://hobbyhub8.herokuapp.com/api/events/:eventId/comments/:commentId/replies
   *
   * @apiParamExample {json} Request-Example:
   *    {
   *      "author": "bob@bob.bob",
   *      "text": "Awsome reply. FACT!"
   *    }
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
   *      "category": "football",
   *      "start": 1478623941,
   *      "end": 1478623941,
   *      "address": "Vodičkova 25, Praha",
   *      "minPeople": 2,
   *      "maxPeople": 8,
   *      "attendees": []
   *      "comments": []
   *    }
   *
   * @apiError UserNotFound The <code>email</code> of an User has not been found
   * @apiError EventNotFound The <code>eventId</code> of an Event has not been found
   * @apiError CommentNotFound The <code>commentId</code> of an Comment has not been found
   */
  .post(UsersController.isAuthenticated,EventsController.addReply)

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
  .put(UsersController.isAuthenticated,EventsController.attend)
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
  .delete(UsersController.isAuthenticated,EventsController.leave)
  /**
   * @api {PATCH} /events/:eventId/attendees/:userId Approve user as attendee
   * @apiVersion 0.0.1
   * @apiName ApproveUser
   * @apiGroup Event
   * @apiPermission authenticatedUser (organizer)
   *
   * @apiDescription This call change the attendee's state from PENDING to APPROVED
   *
   * @apiError UserNotFound An User with specified <code>userId</code> has not been found
   * @apiError EventNotFound An Event with specified <code>eventId</code> has not been found
   */
  .patch(EventsController.approve);

router.route('/users')
  .post(UsersController.create)
  .get(UsersController.index);

router.route('/users/:userId')
  .get(UsersController.show);

router.route('/users/:userId/rating')
  .post(UsersController.updateRating)
  .delete(UsersController.deleteRating);

router.route('/logout(\\?)?')
  /**
   * @api {GET} /users/logout Logs user out
   * @apiVersion 0.0.1
   * @apiName LogoutUser
   * @apiGroup User
   * @apiPermission anon
   *
   * @apiDescription This call will attempt to logout User with given access token
   *
   * @apiSuccessExample {json} Successful User Response
   *    HTTP/1.1 200 OK
   *    {
   *      "message": "logged out"
   *    }
   *
   * @apiError InvalidToken Provided token was not valid
   */
  .get(UsersController.logout);

router.route('/auth')
  /**
   * @api {GET} /users/auth Authenticates user
   * @apiVersion 0.0.1
   * @apiName AuthUser
   * @apiGroup User
   * @apiPermission anon
   *
   * @apiDescription This call will attempt to authenticate User with given access token and return its entire object on success
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
   * @apiError InvalidToken Provided token was not valid
   */
  .get(UsersController.auth);

router.route('/login')
  /**
   * @api {POST} /users/login Logs user in
   * @apiVersion 0.0.1
   * @apiName LoginUser
   * @apiGroup User
   * @apiPermission anon
   *
   * @apiDescription This call will attempt to authenticate User with given credentials and return its entire object and generated access token on success
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
   *      "user": {
   *        "email": "bob@bob.bob",
   *        "firstName": "bob",
   *        "lastName": "bob",
   *        "pictureUrl": "placehold.it/100x100",
   *        "introduction": "Hi, I'm bob.",
   *        "phone": "+42012356789"
   *        },
   *      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJl..."
   *    }
   *
   * @apiError InvalidCredentials Provided credentials were not valid
   */
  .post(UsersController.login);

export default router;
