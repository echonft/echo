import { linkProvider } from '@echo/api/services/routing/link-provider'
import { redirect } from 'next/navigation'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserPage: FunctionComponent<Props> = ({ params }) => {
  redirect(linkProvider.user.items.get(params))
}

export default UserPage
