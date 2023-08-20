import HomePage from './src/HomePage.js'
import { uiFeatures } from './src/utils.js'

const homePage = new HomePage()
homePage.init()

const { onPageLoad } = uiFeatures
window.addEventListener('load', onPageLoad)
