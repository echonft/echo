import { getUserMockById } from '@echo/firestore'
import { Session } from 'next-auth'

export const mockSession: Session = {
  user: getUserMockById('oE6yUEQBPn7PZ89yMjKn'),
  expires: '1234'
}
