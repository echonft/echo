import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { initializeFirestore } from '@echo/firestore/services/initialize-firestore'
import * as fs from 'node:fs'
import * as path from 'node:path'
import type { Logger } from 'pino'
import { assoc } from 'ramda'
import { fileURLToPath } from 'url'

export async function dumpDb(filename: string, logger?: Logger) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const folderPath = path.join(__dirname, '../../dist')
  await initializeFirestore()
  const collections = await firestoreApp().listCollections()
  let data: Record<string, Record<'id', string>[]> = {}
  for (const collection of collections) {
    const snapshot = await collection.get()
    const collectionData: Record<'id', string>[] = []
    snapshot.forEach((doc) => {
      collectionData.push({ id: doc.id, ...doc.data() })
    })

    data = assoc(collection.id, collectionData, data)
  }
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }
  fs.writeFileSync(`${folderPath}/${filename}`, JSON.stringify(data, null, 2))
  logger?.info(`Dumped database to ${folderPath}/${filename}`)
}
