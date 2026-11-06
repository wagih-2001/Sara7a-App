export const findOne = async ({
  model,
  filter = {},
  select = '',
  options = {}
} = {}) => {
  const query = model.findOne(filter);

  if (select) query.select(select);
  if (options.populate) query.populate(options.populate);
  if (options.sort) query.sort(options.sort);
  if (options.lean) query.lean();

  return await query.exec();
};

export const findById = async ({
  model,
  id,
  select = '',
  options = {}
} = {}) => {
  const query = model.findById(id);

  if (select) query.select(select);
  if (options.populate) query.populate(options.populate);
  if (options.sort) query.sort(options.sort);
  if (options.lean) query.lean();

  return await query.exec();
};

export const find = async ({
  model,
  filter = {},
  select = '',
  options = {}
} = {}) => {
  const query = model.find(filter);

  if (select) query.select(select);
  if (options.populate) query.populate(options.populate);
  if (options.sort) query.sort(options.sort);
  if (options.lean) query.lean();
  if (options.limit) query.limit(options.limit);
  if (options.skip) query.skip(options.skip);

  return await query.exec();
};

// Create One Document
export const create = async ({ model, data, options = {} } = {}) => {
  const doc = new model(data);

  await doc.validate();

  return await doc.save(options);
};

// Create One Document Using insertMany
export const createOne = async ({ model, data, options = {} } = {}) => {
  const [doc] = await model.insertMany([data], options);

  return doc;
};

// Insert Multiple Documents
export const insertMany = async ({ model, data, options = {} } = {}) => {
  return await model.insertMany(data, options);
};

// Update One Document
export const updateOne = async ({
  model,
  filter,
  update,
  options = {}
} = {}) => {
  return await model.updateOne(
    filter,
    {
      ...update,
      $inc: {
        ...(update.$inc || {}),
        __v: 1
      }
    },
    options
  );
};

// Find One And Update
export const findOneAndUpdate = async ({
  model,
  filter,
  update,
  options = {}
} = {}) => {
  return await model.findOneAndUpdate(
    filter,
    {
      ...update,
      $inc: {
        ...(update.$inc || {}),
        __v: 1
      }
    },
    {
      ...options,
      new: true,
      runValidators: true
    }
  );
};

// Find By ID And Update

export const findByIdAndUpdate = async ({
  model,
  id,
  update = {},
  options = {}
} = {}) => {
  return await model.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
    ...options
  });
};

// Delete One Document
export const deleteOne = async ({ model, filter } = {}) => {
  return await model.deleteOne(filter);
};

// Delete Multiple Documents
export const deleteMany = async ({ model, filter } = {}) => {
  return await model.deleteMany(filter);
};

// Find One And Delete
export const findOneAndDelete = async ({ model, filter } = {}) => {
  return await model.findOneAndDelete(filter);
};
