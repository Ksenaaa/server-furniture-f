const lastItem = (async(Model, category, type, quantity) => {
  let count
  let dataModel

  if (!!category || !!type) {
    count = await Model.find({$or: [{category: category}, {type: type}]}).count()
    
    dataModel = await Model.find({$or: [{category: category}, {type: type}]})
      .limit(quantity)
      .skip(count < quantity ? 0 : count - quantity)
      .exec()
  } else {
    count = await Model.countDocuments()

    dataModel = await Model.find({})
      .limit(quantity)
      .skip(count < quantity ? 0 : count - quantity)
      .exec()
  }

  return { dataModel }
})

module.exports = lastItem
