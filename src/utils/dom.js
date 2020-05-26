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

    if (Element.prototype.append) this.$element.append(node)
    else this.$element.appendChild(node)

    return this
  }

  get dataAtt() {
    return this.$element.dataset
  }

  closest(selector) {
    return $(this.$element.closest(selector))
  }

  getCoords() {
    return this.$element.getBoundingClientRect()
  }

  findAll(selector) {
    return this.$element.querySelectorAll(selector)
  }

  styles(styles = {}) {
    Object
	      .keys(styles)
	      .forEach( (key) => {
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
