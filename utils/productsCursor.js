const productsCursor = (async(data) => {
  const products = await data.map(item => ({
    id: item._id,
    name: item.name,
    code: item.code,
    category: item.category,
    price: item.quality.standart,
    colors: item.colors,
    img: item.imgs[0]
  }))

  return { products }
})

module.exports = productsCursor
