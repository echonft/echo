import { useCollection } from './use-collection'
import { FirestoreDocumentPath, FirestorePlayer, FirestoreSession, mapSession } from '@echo/firestore'
import { getDocRef } from '@echo/firestore/dist/utils/document-reference/get-doc-ref'
import { Session, SessionStatus } from '@echo/model'
import { limit, orderBy, where } from 'firebase/firestore'

export const useUserSessions = (id: string) => {
  const userRef = getDocRef<FirestorePlayer>(FirestoreDocumentPath.PLAYERS, [id])
  return useCollection<FirestoreSession, Session>(FirestoreDocumentPath.SESSIONS, mapSession, {
    constraints: [
      where('player', '==', userRef),
      where('status', '==', SessionStatus.USER_APPROVED),
      orderBy('createdAt'),
      limit(100)
    ]
  })
}
