/**
 * 从 cardElement 中抽离出所有的 imgElements
 */

export const getImgElements = (cardElements) => {
  const imgElements = []

  cardElements.forEach((card) => {
    imgElements.push(...card.getElementsByTagName('img'))
  })

  return imgElements
}

/**
 * 生成所有图片链接的数组
 */
export const getAllImg = (imgElements) => {
  return imgElements.map((img) => img.src)
}

/**
 * 监听图片数组加载完成(通过promise 实现)
 * @params {Array} 图片src 列表
 */

export const onCompleteImgs = (imgs) => {
  // promise 集合
  const result = []
  // 循环构建 promise 队列
  imgs.forEach((img, index) => {
    result[index] = new Promise((resolve, reject) => {
      const image = new Image()
      image.src = img
      image.onload = () => {
        resolve({
          img,
          index,
          width: image.width,
          height: image.height
        })
      }
      // 在图片加载出现错误的时候，也要 resolve 处理
      image.onerror = function () {
        resolve({
          img,
          index
        })
      }
    })
    // )
  })

  return Promise.all(result)
}

/**
 * 返回列高数组中最小列高
 */
export const getMinHeight = (colHeightsArr) => {
  return Math.min(...colHeightsArr)
}
/**
 * 返回列高对象中的最大的高度
 */
export const getMaxHeight = (colHeightsArr) => {
  return Math.max(...colHeightsArr)
}

/**
 * 返回列高数组中最小高度所在的列
 */
export const getMinHeightColumn = (colHeightsArr) => {
  const minHeight = getMinHeight(colHeightsArr)
  return colHeightsArr.indexOf(minHeight)
}
