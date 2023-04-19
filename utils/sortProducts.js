const sortProducts = (sortData) => {
  if (sortData) {
    let parseSort = {}

    sortData.split(';').forEach(element => {
      const newElement = element.split('=')
      return parseSort[newElement[0]] = newElement[1]
    })
    
    let sortField 

    if (parseSort.option === 'price') sortField = 'quality.standart'
    if (parseSort.option === 'name') sortField = 'name'
    if (parseSort.option === 'popularity') sortField = 'popularity'

    const sortOrder = parseSort.method === 'asc' ? 1 : -1

    return { [sortField]: sortOrder, _id: 1 }
  } else return 0
}

module.exports = sortProducts
