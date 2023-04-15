const sortProducts = (sortData) => {
  if (sortData) {
    let parseSort = {}

    sortData.split(';').forEach(element => {
      const newElement = element.split('=')
      return parseSort[newElement[0]] = newElement[1]
    })
    
    const sortField = parseSort.option === 'price' ? 'quality.standart' :
      parseSort.option === 'name' ? 'name' :
      parseSort.option === 'popularity' ? 'popularity' :
      ''
    const sortOrder = parseSort.method === 'asc' ? 1 : -1

    return { [sortField]: sortOrder, _id: 1 }
  } else return 0
}

module.exports = sortProducts
