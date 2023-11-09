import { deleteSession } from '@echo/firestore-test/session/delete-session'
import { getAllSessions } from '@echo/firestore-test/session/get-all-sessions'

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
