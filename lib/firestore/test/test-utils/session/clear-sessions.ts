import { deleteSession } from '@echo/firestore/crud/session/delete-session'
import { getAllSessions } from '@echo/firestore/crud/session/get-all-sessions'

export async function clearSessions() {
  const sessions = await getAllSessions()
  for (const session of sessions) {
    try {
      await deleteSession(session.userId)
    } catch (e) {
      // nothing to do
    }
  }
}
