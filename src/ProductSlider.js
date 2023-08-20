import Slider from './Slider.js'
import { uiFeatures } from './utils.js'

const { spinLeafs, setBackgroundColor, toggleDarkTheme, renderProductSummary } = uiFeatures

class ProductSlider extends Slider {
  constructor(data) {
    super(...arguments)

    this.products = data

    this.slides = data.map(({ name, images }, i) => {
      const newSlide = document.createElement('div')
      newSlide.classList.add('slide')
      if (i === 0) {
        newSlide.classList.add('activeSlide')
      }

      const title = document.createElement('h1')
      title.innerHTML = name
      const imgElements = Object.keys(images).map((key) => {
        const img = document.createElement('img')
        img.classList.add(key)
        img.src = images[key]
        img.alt = key
        return img
      })
      newSlide.appendChild(title)
      imgElements.forEach((img) => newSlide.appendChild(img))

      return newSlide
    })
  }

  /** Sets current slide and scrolls to it */
  setActiveSlide = (index) => {
    const product = this.products[index]
    this.setActiveSlideIndex(index)

    toggleDarkTheme(product.isTextDark)
    setBackgroundColor(product.color)
    spinLeafs()
  }
}

export default ProductSlider
