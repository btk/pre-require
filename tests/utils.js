export const assetsLength = (assets) => {
  let count = 0
  Object.keys(assets).forEach(key => {
    const asset = assets[key]
    if (typeof asset === 'object') {
      count += assetsLength(asset)
    } else {
      count++
    }
  })
  return count
}