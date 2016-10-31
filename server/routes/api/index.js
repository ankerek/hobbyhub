import express from 'express';

import * as EventsController from '../../controllers/events_controller'
import * as UsersController from '../../controllers/users_controller'
import * as CategoriesController from '../../controllers/categories_controller'

const router = express.Router();

router.route('/categories')
  .post(CategoriesController.create)
  .get(CategoriesController.index);

router.route('categories/:category_id')
  .post(CategoriesController.show);

router.route('/events')
  .post(EventsController.create)
  .get(EventsController.index);

router.route('/events/:event_id')
  .get(EventsController.show);

router.route('/users')
  .post(UsersController.create)
  .get(UsersController.index);

router.route('/users/:user_id')
  .get(UsersController.show);

export default router;
