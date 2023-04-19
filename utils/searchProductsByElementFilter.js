const searchProductsByElementFilter = (parseData, colorsData) => {
  let colorWithMaterialFilter
  const typeFilter = parseData.type ? { $in: parseData.type } : { $exists: true }

  let colorFilter
  let materialFilter

  if (parseData.color) {
    colorFilter = colorsData.filter(color => parseData.color.find(name => color.name === name))
      .map(color => color.id)
  }

  if (parseData.material) {
    materialFilter = colorsData.filter(color => parseData.material.find(material => color.material === material))
      .map(color => color.id)
  }

  if (parseData.color && parseData.material) {
    colorWithMaterialFilter = { $in: colorFilter.filter(item => materialFilter.indexOf(item) >= 0) }
  } else if (parseData.color) {
    colorWithMaterialFilter = { $in: colorFilter }
  } else if (parseData.material) {
    colorWithMaterialFilter = { $in: materialFilter }
  } else colorWithMaterialFilter = { $exists: true }
  
  const createRangeFilter = (data) => {
    let filterData
    let valueElement

    if (data) {
      valueElement = data.reduce((acc, item) => {
        acc[item.split(':')[0]] = Number(item.split(':')[1])
        return acc
      }, {})

      const from = valueElement.from
      const to = valueElement.to

      if (from && to) {
        filterData = { $gte: from, $lte: to }
      } else if (from) {
        filterData = { $gte: from }
      } else if (to) {
        filterData = { $lte: to }
      } else filterData = { $exists: true }

      return filterData
    } else filterData = { $exists: true }

    return filterData
  }

  const priceFilter = createRangeFilter(parseData.price)
  const widthFilter = createRangeFilter(parseData.width)
  const heightFilter = createRangeFilter(parseData.height)
  const lengthFilter = createRangeFilter(parseData.length)

  return { 
    colorWithMaterialFilter, 
    typeFilter, 
    priceFilter, 
    widthFilter, 
    heightFilter, 
    lengthFilter 
  }
}

module.exports = searchProductsByElementFilter
