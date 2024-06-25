import type { Command, CommandName } from '@echo/commands/types/command'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { clearDb } from '@echo/firestore/utils/clear-db'

const name: CommandName = 'clear-db'
export const clearDbCommand: Command = {
  name,
  execute: async function () {
    await initializeFirebase()
    await clearDb()
  }
}
