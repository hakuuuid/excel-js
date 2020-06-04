class Dom {
  constructor(selector) {
    this.$element = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$element.innerHTML = html
      return this
    }
    return this.$element.outerHTML.trim()
  }

  textContent(text) {
    if (typeof text === 'string') {
      this.$element.textContent = text
      return this
    }
    return this.$element.textContent.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$element.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$element.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) node = node.$element

    if (Element.prototype.append) {
      this.$element.append(node)
    } else {
      this.$element.appendChild(node)
    }

    return this
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1],
      }
    }
    return this.dataAtt.id
  }


  get dataAtt() {
    return this.$element.dataset
  }

  getCoords() {
    return this.$element.getBoundingClientRect()
  }

  closest(selector) {
    return $(this.$element.closest(selector))
  }

  findAll(selector) {
    return this.$element.querySelectorAll(selector)
  }

  find(selector) {
    return $(this.$element.querySelector(selector))
  }

  focus() {
    this.$element.focus()
    return this
  }

  addClass(className) {
    this.$element.classList.add(className)
  }

  removeClass(className) {
    this.$element.classList.remove(className)
  }

  styles(styles = {}) {
    Object
        .keys(styles)
        .forEach((key) => {
          this.$element.style[key] = styles[key]
        })
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, className = '') => {
  const element = document.createElement(tagName)
  if (className) {
    element.classList.add(className)
  }
  return $(element)
}
