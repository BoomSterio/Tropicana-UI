class Slider {
  /**
   * Slider constructor
   * @param data Array of items to put in slider
   * @param element Slider wrapper element where slides will be inserted (optional). Default element is .slider
   */
  constructor(data, element) {
    this.slider = element || document.querySelector('.slider')

    this.currentIndex = 0

    this.slides = data
  }

  /** Inserts slides into slider element */
  renderToDOM = () => {
    this.slides.forEach((slide) => this.slider.appendChild(slide))
  }

  /** Returns index of the current slide */
  getActiveSlideIndex = () => {
    return this.currentIndex
  }

  /** Returns current slide element */
  getActiveSlide = () => {
    return this.slides[this.currentIndex]
  }
  
  /** Sets current slide and scrolls to it */
  setActiveSlideIndex = (index) => {
    this.currentIndex = index
    this.slides.forEach((slide) => {
      slide.classList.remove('activeSlide')
    })

    const slideTo = this.slides[index]
    slideTo.classList.add('activeSlide')
    this.slider.scroll({
      left: slideTo.offsetLeft,
      behavior: 'smooth',
    })
  }
}

export default Slider