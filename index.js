import HomePage from './src/HomePage.js'
import { uiFeatures } from './src/utils.js'
import './src/scroll-polyfill.js'

const homePage = new HomePage()
homePage.init()

const { onPageLoad } = uiFeatures
window.addEventListener('load', onPageLoad)
