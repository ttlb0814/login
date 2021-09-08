export function downloadUrl(res, name) {
  const blob = new Blob([res], {type: 'application/vnd.ms-excel'}) // 构造一个blob对象来处理数据
  const fileName = name + '.xlsx' // 导出文件名
  const elink = document.createElement('a') // 创建a标签
  elink.download = fileName // a标签添加属性
  elink.style.display = 'none'
  elink.href = URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click() // 下载
  URL.revokeObjectURL(elink.href) // 释放URL对象
  document.body.removeChild(elink) // 释放标签

}
