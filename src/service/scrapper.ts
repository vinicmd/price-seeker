import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

export const scrapper = puppeteer.use(StealthPlugin())
