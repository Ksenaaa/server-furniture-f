const pagination = (async(Model, page, limit) => {
  const dataModel = await Model.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()

  const count = await Model.countDocuments()
  const totalPages = Math.ceil(count / limit) || 1
  const currentPage = +page || 1

  return { dataModel, totalPages, currentPage }
})

module.exports = pagination
