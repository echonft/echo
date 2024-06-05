import type { Command } from '@echo/commands/types/command'
import { clearDb } from '@echo/firestore/crud/clear-db'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'

export const clearDbCommand: Command = {
  name: 'clear-db',
  execute: async function () {
    initializeFirebase()
    await clearDb()
    await terminateFirestore()
  }
}
