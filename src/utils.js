class UIFeatures {
  /** Randomly spins leafs on the screen */
  spinLeafs = () => {
    const elements = document.querySelector('.sliderleaves').querySelectorAll('.leaf')

    elements.forEach((element) => {
      const currentRotation = getComputedStyle(element).getPropertyValue('transform')

      const match = currentRotation.match(/matrix\((.*)\)/)
      const matrix = match ? match[1].split(',') : [0, 0, 0, 0, 0, 0]
      const angle = Math.round(Math.atan2(matrix[1], matrix[0]) * (180 / Math.PI))

      element.style.transform = `rotate(${angle + 80}deg)`
    })
  }

  /** Set slider frame background color */
  setBackgroundColor = (color) => {
    document.body.style.backgroundColor = `var(--${color}`
  }

  /** Toggles dark theme */
  toggleDarkTheme = (isDark) => {
    if (isDark) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }

  /** Smooth transition after page load is finished */
  onPageLoad = () => {
    const loader = document.getElementById('loader')
    loader.style.opacity = 0
    setTimeout(() => {
      this.spinLeafs()
      loader.remove()
    }, 400)
  }
}

export const uiFeatures = new UIFeatures()

const TimerStatusEnum = {
  RUNNING: 1,
  PAUSED: 2,
  RESUMED: 3,
}

export class IntervalTimer {
  constructor(callback, interval) {
    this.callback = callback
    this.interval = interval

    this.timerId = window.setInterval(callback, interval)
    this.startTime = new Date()
    this.state = TimerStatusEnum.RUNNING
    this.remaining = 0
  }

  pause = function () {
    if (this.state != TimerStatusEnum.RUNNING) return

    this.remaining = this.interval - (new Date() - this.startTime)
    window.clearInterval(this.timerId)
    this.state = TimerStatusEnum.PAUSED
  }

  resume = function () {
    if (this.state != TimerStatusEnum.PAUSED) return

    this.state = TimerStatusEnum.RESUMED
    window.setTimeout(this.timeoutCallback.bind(this), this.remaining)
  }

  restart = function () {
    window.clearInterval(this.timerId)

    this.startTime = new Date()
    this.timerId = window.setInterval(this.callback, this.interval)
    this.state = TimerStatusEnum.RUNNING
  }

  timeoutCallback = function () {
    if (this.state != TimerStatusEnum.RESUMED) return

    this.callback()

    this.startTime = new Date()
    this.timerId = window.setInterval(this.callback, this.interval)
    this.state = TimerStatusEnum.RUNNING
  }
}
