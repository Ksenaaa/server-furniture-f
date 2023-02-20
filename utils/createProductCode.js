const createProductCode = (async(category, type, Model) => {
  const cat = (category.slice(0, 2) + category.slice(-1)).toUpperCase()
  const typ = type.slice(0, 2).toUpperCase()

  const lastElement = await Model.find({ category: category, type: type }).limit(1).sort({$natural:-1})

  let currentNumber

  if (lastElement.length > 0) {
    currentNumber = Number(lastElement.map(item => item.code)[0].slice(-5))
  } else {
    currentNumber = 0
  }

  const changeNumber = (currentNumber + 1).toString()
  const zeroLength = 5;

  const num = changeNumber.padStart(zeroLength, '0')
  
  return `${cat}${typ}${num}` 
})

module.exports = createProductCode
