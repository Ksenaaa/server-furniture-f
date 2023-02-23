const pagination = (async({ Model, category, type, page, limit }) => {
  let count
  let dataModel
  
  if (!!category || !!type) {
    count = await Model.find({$or: [{category: category}, {type: type}]}).count()
    
    dataModel = await Model.find({$or: [{category: category}, {type: type}]})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()
  } else {
    count = await Model.countDocuments()
    
    dataModel = await Model.find({})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()
  }
    
  const totalPages = Math.ceil(count / limit) || 1
  const currentPage = +page || 1

  return { dataModel, totalPages, currentPage }
})

module.exports = pagination
