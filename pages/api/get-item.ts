import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: 'secret_GEXe9XtBR8JfDHNM8yCTL55HuncrEqYwugeGTTiTnII',
})
const databaseID = '55957db0f31045e2aa29272ffa689abb'

async function getItem() {
  try {
    const response = await notion.databases.query({
      database_id: databaseID,
      sorts: [
        {
          property: 'price',
          direction: 'ascending',
        },
      ],
    })
    console.log(response)
    return response
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}

type Data = {
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await getItem()
    res.status(200).json({ items: response?.results, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
