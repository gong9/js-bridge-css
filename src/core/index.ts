interface DataType {
  [key: string]: unknown
}

interface StyleDataType {
  oldData: DataType
  newData: DataType
}

class Bridge {
  private styleData: StyleDataType

  constructor() {
    this.styleData = {
      oldData: {},
      newData: {},
    }
  }

  /**
   * 向css注入数据
   * @param this
   * @param selector
   * @param data
   */
  jsToCss = function (this: Bridge, selector: string, data: DataType) {
    const targerNode = document.querySelector(selector)
    this.styleData.oldData = data
    this.styleData.newData = this.dataConversion(data)

    if (targerNode) {
      const curData = this.styleData.newData
      for (const key in curData) {
        if (Object.prototype.hasOwnProperty.call(curData, key))
          (targerNode as HTMLElement).style.setProperty(key, curData[key] as string)
      }
    }
  }

  cssToJs = function () {}

  private dataConversion = function (data: DataType) {
    const newData: DataType = {}
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key))
        newData[`--${key}`] = data[key]
    }

    return newData
  }
}

export default new Bridge()
