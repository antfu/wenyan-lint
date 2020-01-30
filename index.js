function format(code, options = {}) {
  const {
    space = false,
    tabSize = 2,
  } = options

  if (!space) {
    const regex = new RegExp(`^([\s\t]*)[ ]{${tabSize}}([\s\t]*)`, 'gm')
    let prev_code = code
    while (true) {
      prev_code = code
      code = code.replace(regex, '$1\t$2')
      if (prev_code === code)
        break
    }
    // remove single spaces
    code = code.replace(/^(\t*)[ ]+/gm, '$1')
  }
  else {
    const spaces = new Array(tabSize).fill(' ').join('')
    const regex = new RegExp(`^([\s\t]*)\t`, 'gm')
    let prev_code = code
    while (true) {
      prev_code = code
      code = code.replace(regex, `$1${spaces}`)
      if (prev_code === code)
        break
    }
  }

  // remove tailing spaces
  code = code.replace(/[ \t]*$/gm, '')
  return code
}

module.exports = {
  format
}