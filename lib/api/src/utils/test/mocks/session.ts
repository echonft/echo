import { mockUser } from '@echo/model'
import { Session } from 'next-auth'

export const mockSession: Session = {
  user: mockUser,
  expires: '1234'
}
