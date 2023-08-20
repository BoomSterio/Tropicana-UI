import products from '../data/products.js'
import ProductSlider from './ProductSlider.js'
import { IntervalTimer } from './utils.js'

const AUTO_SLIDE_TIMEOUT = 5000
const SECTION_TRANSITION_DURATION_S = 2

class HomePage {
  constructor() {
    this.products = [...products]

    this.isAnimationRunning = false
    this.isAssortmentReached = false
    this.productOverlayImg = document.querySelector('.productOverlayImg')
  }

  init = () => {
    this.productSlider = new ProductSlider(this.products)
    this.productSlider.renderToDOM()

    this.renderProductSummary(this.productSlider.currentIndex)
    this.renderAssortmentItems(this.productSlider.currentIndex)
    this.renderSelectors()
    this.addParallaxEffect()
    this.addScrollHandler()
    this.autoSliderInterval = new IntervalTimer(() => {
      const currentIndex = this.productSlider.getActiveSlideIndex()
      const nextIndex = currentIndex >= this.selectors.length - 1 ? 0 : currentIndex + 1

      this.selectSlideHandler(nextIndex, this.selectors[nextIndex])
    }, AUTO_SLIDE_TIMEOUT)
  }

  getProductImg = () => this.productSlider.getActiveSlide().querySelector('.imgMain')

  addScrollHandler = () => {
    this.productOverlayImg.addEventListener('animationstart', () => {
      this.isAnimationRunning = true
    })
    this.productOverlayImg.addEventListener('animationend', () => {
      this.isAnimationRunning = false
      if (window.scrollY < 150) {
        this.getProductImg().style.opacity = 1
        this.productOverlayImg.classList.add('hidden')
      }
      if (window.scrollY > 1200) {
        this.isAssortmentReached = true
        document.querySelector('.assortmentSection .middle .assortmentImg').classList.remove('hidden')
        this.productOverlayImg.style.animation = `moveToSummary 0s ease forwards`
      }
    })

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY

      if (scrollPos > 1200 && !this.isAssortmentReached) {
        this.autoSliderInterval.pause()

        const productImg = this.getProductImg()
        productImg.style.opacity = 0
        this.productOverlayImg.src = productImg.src
        this.productOverlayImg.classList.remove('hidden')
        this.productOverlayImg.style.animation = `moveToAssortment 1.5s ease forwards`
        return
      }

      if (scrollPos > 150 && scrollPos < 1200) {
        this.autoSliderInterval.pause()

        const productImg = this.getProductImg()
        productImg.style.opacity = 0
        this.productOverlayImg.src = productImg.src
        this.productOverlayImg.classList.remove('hidden')
        this.productOverlayImg.style.animation = `moveToSummary ${SECTION_TRANSITION_DURATION_S}s ease forwards`
        return
      }

      if (scrollPos < 150) {
        this.autoSliderInterval.restart()

        this.productOverlayImg.src = this.getProductImg().src
        this.productOverlayImg.style.animationPlayState = 'paused'
        this.productOverlayImg.style.animation = `moveToSlider ${SECTION_TRANSITION_DURATION_S}s ease forwards`
      }
    })
  }

  addParallaxEffect = () => {
    document
      .querySelector('.palmLeavesSection')
      .querySelectorAll('.leaf')
      .forEach(
        (leaf) =>
          new simpleParallax(leaf, {
            delay: 0.6,
            transition: 'cubic-bezier(0,0,0,1)',
            overflow: true,
            scale: Math.random() * (1.6 - 1.3 + 1) + 1.3,
            maxTransition: 70,
          })
      )
    document
      .querySelector('.summarySection')
      .querySelectorAll('.fruit')
      .forEach(
        (fruit) =>
          new simpleParallax(fruit, {
            delay: 0.6,
            transition: 'cubic-bezier(0,0,0,1)',
            overflow: true,
            scale: 1.6,
            maxTransition: 70,
          })
      )
  }

  // TODO: Remove selector param
  selectSlideHandler = (index, selector) => {
    if (index === this.productSlider.getActiveSlideIndex() || this.isAnimationRunning) return

    this.productSlider.setActiveSlide(index)

    this.renderAssortmentItems(index)
    this.renderProductSummary(index)

    this.isAssortmentReached = false

    const productImg = this.getProductImg()
    productImg.style.opacity = 1
    this.productOverlayImg.src = productImg.src

    this.selectors.forEach((el) => {
      el.classList.remove('isactive')
    })
    selector.classList.add('isactive')
  }

  /** Renders slide selector buttons */
  renderSelectors = () => {
    const selectorWrapper = document.querySelector('.selectSlide')

    const selectors = Array.from(Array(this.productSlider.slides.length)).map((_, index) => {
      const selector = document.createElement('span')
      selector.classList.add('selector')
      if (index === 0) {
        selector.classList.add('isactive')
      }
      selector.addEventListener('click', () => {
        this.autoSliderInterval.restart()
        this.selectSlideHandler(index, selector)
      })

      selectorWrapper.appendChild(selector)
      return selector
    })

    this.selectors = selectors
  }

  /** Renders product summary inside element with .summary class */
  renderProductSummary = (index) => {
    const product = this.products[index]

    const summary = document.querySelector('.summary')
    const addToCartBtn = summary.querySelector('.addToCart')

    const title = document.createElement('h2')
    title.innerHTML = product.name

    const description = document.createElement('p')
    description.classList.add('description')
    description.innerHTML = product.description

    const price = document.createElement('span')
    price.classList.add('price')
    price.innerHTML = '$' + product.price

    summary.replaceChildren(...[title, description, price, addToCartBtn])
  }

  /** Renders assortment inside element with .drinks class */
  renderAssortmentItems = (index) => {
    const assortment = document.querySelector('.assortmentSection .drinks')

    const createDrink = (product, pos) => {
      const img = document.createElement('img')
      img.classList.add('assortmentImg')
      img.src = product.images.imgMain

      const circle = document.createElement('div')
      circle.classList.add('circle')
      circle.appendChild(img)
      circle.style.backgroundColor = `var(--${product.color})`

      const title = document.createElement('h4')
      title.classList.add('title')
      title.innerHTML = product.name
      title.style.color = `var(--${product.color})`

      const el = document.createElement('div')
      el.classList.add('item', pos)
      el.append(circle, title)
      return el
    }

    const middle = createDrink(this.products[index], 'middle')
    middle.querySelector('.assortmentImg').classList.add('hidden')

    const restProducts = this.products.filter((el, i) => index !== i)

    const left = createDrink(restProducts[0], 'left')

    const right = createDrink(restProducts[1], 'right')

    assortment.replaceChildren(left, middle, right)
  }
}

export default HomePage
