const paginationByElement = (async(args) => {
  const { Model, element, elementName, page, limit } = args
  
  let count
  let dataModel
  let findElements
  
  if (element) {
    findElements = { $or: [{ category: elementName }, { type: elementName }] }
  } else {
    findElements = {}
  }

  count = await Model.find(findElements).count()
  
  dataModel = await Model.find(findElements)
    .limit(Number(limit))
    .skip((page - 1) * limit)
    .exec()

  const totalPages = Math.ceil(count / limit) || 1
  const currentPage = Number(page) || 1

  return { dataModel, totalPages, currentPage }
})

module.exports = paginationByElement
