/* link = 'https://www.amazon.es/-/pt/dp/B0BRXZXWLQ/' */
import type { Product } from '../../utils/types'
import { scrapper } from '../scrapper'

export async function scrapperAmazon(link: string): Promise<Product> {
  const browser = await scrapper.launch({ headless: false })
  const page = await browser.newPage()
  await page.setViewport({ width: 1380, height: 1024 })

  await page.goto(link)
  await page.waitForSelector('#productTitle')

  const data = await page.evaluate(() => {
    const name =
      document.querySelector('#productTitle')?.textContent ?? 'NOT FOUND'

    const currentPrice =
      document.querySelector(
        'span.a-price.a-text-normal.aok-align-center.reinventPriceAccordionT2 > span:nth-child(2)'
      )?.textContent ?? 'NOT FOUND'
    const ean =
      document.querySelector('#productEan')?.textContent ?? 'NOT FOUND'

    const originalPrice =
      document.querySelector(
        '#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-small.aok-align-center > span > span.aok-relative > span.a-size-small.a-color-secondary.aok-align-center.basisPrice > span > span:nth-child(2)'
      )?.textContent ?? 'NOT FOUND'

    const productImage =
      document
        .querySelector('img.a-dynamic-image.a-stretch-horizontal')
        ?.getAttribute('src') ?? 'NOT FOUND'

    return {
      name,
      ean,
      currentPrice,
      originalPrice,
      productImage
    }
  })

  await browser.close()
  return data
}
