import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: 'secret_GEXe9XtBR8JfDHNM8yCTL55HuncrEqYwugeGTTiTnII',
})
const databaseID = '55957db0f31045e2aa29272ffa689abb'

async function addItem(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseID },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    })
    console.log(response)
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query
  if (name == null) {
    return res.status(400).json({ message: 'No name' })
  }
  try {
    await addItem(String(name))
    res.status(200).json({ message: `Success ${name} added` })
  } catch (error) {
    res.status(400).json({ message: `Failed ${name} added` })
  }
}
