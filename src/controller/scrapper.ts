import type { Request, Response } from 'express'
import { nameFormater } from '../utils/name-formater'
import { scrapperPcdiga } from '../service/scrapper/pcdiga'
import { scrapperAmazon } from '../service/scrapper/amazon'

export async function Scrapper(req: Request, res: Response) {
  try {
    const link =
      (req.body as string) ?? 'https://www.amazon.es/-/pt/dp/B0BRXZXWLQ/'
    const siteName = nameFormater(link)
    if (siteName === 'pcdiga') {
      const data = await scrapperPcdiga(link)

      return res.status(200).json(data)
    }
    if (siteName === 'amazon') {
      const data = await scrapperAmazon(link)
      return res.status(200).json(data)
    }
  } catch (error) {
    console.error(error)
  }
}
