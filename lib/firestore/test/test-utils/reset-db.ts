import { clearDb } from '@test-utils/clear-db'
import { initializeDb } from '@test-utils/initialize-db'

export async function resetDb() {
  await clearDb()
  await initializeDb()
}
