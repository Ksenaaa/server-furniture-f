const createFilterData = require("./createFilterData")
const searchProductsByElementFilter = require("./searchProductsByElementFilter")
const sortProducts = require("./sortProducts")

const paginationProductsList = (async(args) => {
  const { Products, Colors, category, page, limit, filter, sort } = args

  let productsData
  let colorsData = await Colors.find({})
  let filterData
  let parseFilter
  let findElements
  
  if (category) {
    if (filter) {
      filter.split(';').forEach(element => {
        const newElement = element.split('=')
        parseFilter = { ...parseFilter, [newElement[0]]: newElement[1].split(',') }
      })
  
      const { 
        colorWithMaterialFilter, 
        typeFilter, 
        priceFilter, 
        widthFilter, 
        heightFilter, 
        lengthFilter 
      } = searchProductsByElementFilter(parseFilter, colorsData)
    
      findElements = { 
        $and: [
          { category: category }, 
          { type: typeFilter }, 
          { colors: colorWithMaterialFilter },
          { 'quality.standart': priceFilter },
          { 'characteristics.size.width': widthFilter },
          { 'characteristics.size.height': heightFilter },
          { 'characteristics.size.length': lengthFilter }
        ]
      }
    } else {
      findElements = { category: category }
    }
  } else {
    findElements = {}
  }

  let query = findElements
  let options = {
    sort: sortProducts(sort),
    page,
    limit
  }

  const allProducts = await Products.paginate(query, { pagination: false })

  filterData = createFilterData(allProducts.docs, colorsData, parseFilter)

  const products = await Products.paginate(query, options)

  productsData = products.docs

  const totalPages = products.totalPages
  const currentPage = products.page
    
  return { productsData, totalPages, currentPage, filterData }
})

module.exports = paginationProductsList
