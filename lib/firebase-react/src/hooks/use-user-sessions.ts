import { useCollection } from './use-collection'
import { FirestoreDocumentPath, FirestorePlayer, FirestoreSession, mapSession } from '@echo/firestore'
import { Session, SessionStatus } from '@echo/model'
import { limit, orderBy, where } from 'firebase/firestore'
import { getDocRefFromPath } from 'lib/firestore/src/utils/document-reference/get-doc-ref-from-path'

export const useUserSessions = (id: string) => {
  const userRef = getDocRefFromPath<FirestorePlayer>(FirestoreDocumentPath.PLAYERS, [id])
  return useCollection<FirestoreSession, Session>(FirestoreDocumentPath.SESSIONS, mapSession, {
    constraints: [
      where('player', '==', userRef),
      where('status', '==', SessionStatus.USER_APPROVED),
      orderBy('createdAt'),
      limit(100)
    ]
  })
}
