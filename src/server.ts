/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import puppeteer from 'puppeteer'
;(async () => {
  const links = [
    'https://pcdiga.com/componentes/motherboards/motherboards-intel/motherboard-micro-atx-asus-prime-b760m-a-wifi-90mb1el0-m0eay0-4711387131435',
    'https://pcdiga.com/imagem-e-som/monitores/monitores/monitor-nilox-nxm24fhd21-ips-23-8-fhd-16-9-75hz-nxm24fhd21-8054320849926',
    'https://pcdiga.com/componentes/memorias-ram/memorias-ram-ddr5/memoria-ram-corsair-vengeance-32gb-2x16gb-ddr5-5600mhz-cl36-preta-cmk32gx5m2b5600z36-840006697787',
    'https://pcdiga.com/componentes/fontes-alimentac-o/fontes-alimentac-o/fonte-de-alimentac-o-atx-msi-mag-a650bn-650w-80-plus-bronze-306-7zp2b11-ce0-4719072849627'
  ]
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false })

  links.forEach(link => {})

  const page = await browser.newPage()

  await page.setViewport({ width: 1080, height: 1024 })

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  )
  // Navigate the page to a URL
  /* await page.goto(
    'https://pcdiga.com/componentes/motherboards/motherboards-intel/motherboard-micro-atx-asus-prime-b760m-a-wifi-90mb1el0-m0eay0-4711387131435'
  )
 */
  await page.goto(
    'https://pcdiga.com/imagem-e-som/monitores/monitores/monitor-nilox-nxm24fhd21-ips-23-8-fhd-16-9-75hz-nxm24fhd21-8054320849926'
  )

  await page.waitForSelector('h1.font-bold')

  const data = await page.evaluate(() => {
    const name =
      document.querySelector('h1.font-bold')?.textContent || 'NOT FOUND'

    const currentPrice =
      document.querySelector(
        'div.text-primary.text-2xl.md\\:text-3xl.font-black'
      )?.textContent || 'NOT FOUND'

    const ean =
      document.querySelector(
        '#body-overlay > div.z-1.flex.flex-col.justify-between.min-h-screen > div.z-1.base-container.py-5.bg-background.pb-28.flex-grow > main > div:nth-child(1) > div.hidden.lg\\:block > div > div.flex > div.flex.flex-col.gap-y-2.xxs\\:items-center.xxs\\:flex-row.h-full.uppercase > div:nth-child(3)'
      )?.textContent || 'NOT FOUND'

    const originalPrice =
      document.querySelector(
        'p.text-xs.tablet\\:text-sm.font-black.line-through.pvpr-lh'
      )?.textContent || 'NOT FOUND'

    const productImage =
      document
        .querySelector(
          '#body-overlay > div.z-1.flex.flex-col.justify-between.min-h-screen > div.z-1.base-container.py-5.bg-background.pb-28.flex-grow > main > div.grid.items-start.w-full.lg\\:grid-cols-product-page.gap-x-6 > div.max-w-full.mt-6 > div.p-4.bg-background-off.rounded-md.grid.gap-y-4 > div.hidden.md\\:block.relative > div.parent-grid-full > div:nth-child(1) > div > div > div > div > div > img'
        )
        ?.getAttribute('src') || 'NOT FOUND'

    return {
      name,
      ean,
      currentPrice,
      originalPrice,
      productImage
    }
  })

  await browser.close()

  const { name, ean, currentPrice, originalPrice, productImage } = data

  console.log({
    name,
    productImage,
    ean,
    currentPrice,
    originalPrice
  })
})()
