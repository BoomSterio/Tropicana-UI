import HomePage from './src/HomePage.js'
import { uiFeatures } from './src/utils.js'
import smoothscroll from './src/scroll-polyfill.js'

smoothscroll.polyfill();

const homePage = new HomePage()
homePage.init()

const { onPageLoad } = uiFeatures
window.addEventListener('load', onPageLoad)
