import Category from '../models/category'

export function index(req, res, next) {
  Category.find((err, categories) => {
    if(err) {
      return next(err);
    }
    res.json(categories);
  })
}

export function create(req, res, next) {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return next(err);
    }
    res.json(category);
  });
}

export function show(req, res, next) {
  Category.findById(req.params.category_id, (err, category) => {
    if (err) {
      return next(err);
    }
    res.json(category);
  })
}
