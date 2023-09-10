import { links } from '@echo/ui/src/constants/links'
import { redirect } from 'next/navigation'
import { FunctionComponent } from 'react'

const ProfilePage: FunctionComponent = () => {
  redirect(links.profile.items)
}

export default ProfilePage
