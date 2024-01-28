import puppeteer from 'puppeteer'
import type { Product } from '../../utils/types'

export async function scrapperPcdiga(link: string): Promise<Product> {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setViewport({ width: 1080, height: 1024 })
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  )
  await page.goto(link)
  await page.waitForSelector('h1.font-bold')

  const data = await page.evaluate(() => {
    const name =
      document.querySelector('h1.font-bold.text-2xl')?.textContent ??
      'NOT FOUND'

    const currentPrice =
      document.querySelector(
        'div.text-primary.text-2xl.md\\:text-3xl.font-black'
      )?.textContent ?? 'NOT FOUND'
    const ean =
      document.querySelector(
        '#body-overlay > div.z-1.flex.flex-col.justify-between.min-h-screen > div.z-1.base-container.py-5.bg-background.pb-28.flex-grow > main > div:nth-child(1) > div.hidden.lg\\:block > div > div.flex > div.flex.flex-col.gap-y-2.xxs\\:items-center.xxs\\:flex-row.h-full.uppercase > div:nth-child(3)'
      )?.textContent ?? 'NOT FOUND'
    const originalPrice =
      document.querySelector(
        '#body-overlay > div.z-1.flex.flex-col.justify-between.min-h-screen > div.z-1.base-container.py-5.bg-background.pb-28.flex-grow > main > div.grid.items-start.w-full.lg\\:grid-cols-product-page.gap-x-6 > div.max-w-full.mt-6 > div.p-4.bg-background-off.rounded-md.grid.gap-y-4 > div:nth-child(4) > div > div > div.flex.gap-x-4.items-center > div.pvpr-lh.undefined.flex.justify-end.self-end.flex-col > p'
      )?.textContent ?? 'NOT FOUND'

    const productImage =
      document
        .querySelector(
          '#body-overlay > div.z-1.flex.flex-col.justify-between.min-h-screen > div.z-1.base-container.py-5.bg-background.pb-28.flex-grow > main > div.grid.items-start.w-full.lg\\:grid-cols-product-page.gap-x-6 > div.max-w-full.mt-6 > div.p-4.bg-background-off.rounded-md.grid.gap-y-4 > div.hidden.md\\:block.relative > div.parent-grid-full > div:nth-child(1) > div > div > div > div > div > img'
        )
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
