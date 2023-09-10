import { MessagesType } from '@echo/ui/src/types/messages'
import { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import { isNil } from 'ramda'

interface Props {
  messages: MessagesType
}

const Logout: NextPage<Props> = () => {
  const { data: session } = useSession()
  return isNil(session) ? <>Already logged out</> : <button onClick={() => void signOut()}>Sign out</button>
}

export default Logout
