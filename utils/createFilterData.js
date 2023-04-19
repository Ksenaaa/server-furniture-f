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
    const resultValue = data.sort().reduce((acc, item) => {
      acc[item] = acc[item] + 1 || 1
      return acc
    }, {})
    
    let value = []

    for (let key in resultValue) {
      value.push({ name: key, count: resultValue[key] })
    }

    return {
      title: nameElement,
      value: value
    }
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

        if (from && to && element >= from && element <= to) {
          if (from) return element >= from
          if (to) return element <= to
        } else return
      })
      
      countProduct = filterElement.length
    } else {
      countProduct = productValue.length
    }
    
    return {
      title: nameElement,
      value: {},
      count: countProduct
    }
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
