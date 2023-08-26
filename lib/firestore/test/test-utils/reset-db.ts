import { clearDb } from './clear-db'
import { initializeDb } from './initialize-db'

export async function resetDb() {
  await clearDb()
  await initializeDb()
}
