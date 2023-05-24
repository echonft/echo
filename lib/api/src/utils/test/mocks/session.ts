import { users } from '@echo/model'
import { Session } from 'next-auth'

export const mockSession: Session = {
  user: users['oE6yUEQBPn7PZ89yMjKn']!,
  expires: '1234'
}
