import { links } from '@echo/ui'
import { redirect } from 'next/navigation'
import { FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserPage: FunctionComponent<Props> = ({ params: { username } }) => {
  redirect(links.user.items(username))
}

export default UserPage
