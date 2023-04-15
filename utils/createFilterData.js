const createFilterData = (productsModel, colorsModel, parseFilter) => {
  const valueType = productsModel.map(element => element.type)

  const valueColor = productsModel.map(element => {
    const productColors = element.colors.map(id => colorsModel.find(color => color.id === id).name)
    const unique = new Set(productColors)
    return [...unique]
  })
    .flat()
  
  const valueMaterial = productsModel.map(element => {
    const productMaterials = element.colors.map(id => colorsModel.find(color => color.id === id).material)
    const unique = new Set(productMaterials)
    return [...unique]
  })
    .flat()

  const productPrice = productsModel.map(element => element.quality.standart)
  const productWidth = productsModel.map(element => element.characteristics.size.width)
  const productHeight = productsModel.map(element => element.characteristics.size.height)
  const productLength = productsModel.map(element => element.characteristics.size.length)

  const createFilterElementCheckbox = (data, nameElement) => {
    let resultValue = {}

    data.sort().forEach(element => {
      resultValue[element] = resultValue[element] + 1 || 1
    })

    let value = []
    for (let key in resultValue) {
      value.push({ name: key, count: resultValue[key] })
    }

    let elementFilter = {
      title: nameElement,
      value: value
    }

    return elementFilter
  }

  const createFilterElementRange = (productValue, nameElement, filterParse) => {
    let countProduct
    let valueElement

    if (filterParse && filterParse[nameElement]) {
      valueElement = filterParse[nameElement].reduce((acc, item) => {
        acc[item.split(':')[0]] = Number(item.split(':')[1])
        return acc
      }, {})

      const filterElement = productValue.filter(element => {
        const from = valueElement.from
        const to = valueElement.to

        return from && to ? element >= from && element <= to :
          from ? element >= from :
            to ? element <= to : 0
      })
      
      countProduct = filterElement.length
    } else {
      countProduct = productValue.length
    }
    
    const elementFilter = {
      title: nameElement,
      value: {},
      count: countProduct
    }

    return elementFilter
  }

  filterData = {
    checkbox: [
      createFilterElementCheckbox(valueType, 'type'),
      createFilterElementCheckbox(valueColor, 'color'),
      createFilterElementCheckbox(valueMaterial, 'material')
    ],
    range: [
      createFilterElementRange(productPrice, 'price', parseFilter),
      createFilterElementRange(productWidth, 'width', parseFilter),
      createFilterElementRange(productHeight, 'height', parseFilter),
      createFilterElementRange(productLength, 'length', parseFilter),
    ]
  }

  return filterData
}

module.exports = createFilterData
