import { MessagesType } from '@echo/ui'
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

// export const getServerSideProps: GetServerSideProps<Props> = async ({ locale }) => {
//   return Promise.resolve({
//     props: {
//       messages: getMessages(locale)
//     }
//   })
// }
export default Logout
