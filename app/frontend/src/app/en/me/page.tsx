import { links } from '@echo/ui/src/constants/links'
import { redirect } from 'next/navigation'
import { FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const ProfilePage: FunctionComponent<Props> = () => {
  redirect(links.profile.items)
}

export default ProfilePage
