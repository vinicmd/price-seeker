import express from 'express'
import { Scrapper } from './controller/scrapper'

const app = express()

app.get('/', Scrapper)

const port = process.env.PORT ?? 8080
app.listen(port, () =>
  console.log(
    `Server is running at port ${port}, in link http://localhost:${port}`
  )
)
