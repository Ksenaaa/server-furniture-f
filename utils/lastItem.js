const lastItem = (async(Model, quantity) => {
  const count = await Model.countDocuments()

  const dataModel = await Model.find()
    .limit(quantity)
    .skip(count < quantity ? 0 : count - quantity)
    .exec()

  return { dataModel }
})

module.exports = lastItem
