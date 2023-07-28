import { userFirestoreData } from '@echo/firestore'
import { Session } from 'next-auth'

export const mockSession: Session = {
  user: userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!,
  expires: '1234'
}
