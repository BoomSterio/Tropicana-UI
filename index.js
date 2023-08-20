import products from './data/products.js'
import HomePage from './src/HomePage.js'
import ProductSlider from './src/ProductSlider.js'
import { uiFeatures, IntervalTimer } from './src/utils.js'

const AUTO_SLIDE_TIMEOUT = 5000
const SECTION_TRANSITION_DURATION_S = 2

const homePage = new HomePage()
homePage.init()

const { onPageLoad } = uiFeatures
window.addEventListener('load', onPageLoad)
