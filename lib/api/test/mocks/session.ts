import { userFirestoreData } from './user-firestore-data'
import { Session } from 'next-auth'

export const mockSession: Session = {
  user: userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!,
  expires: '1234'
}
