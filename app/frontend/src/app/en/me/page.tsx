import { links } from '@echo/ui/constants/links'
import { redirect } from 'next/navigation'
import type { FunctionComponent } from 'react'

const ProfilePage: FunctionComponent = () => {
  redirect(links.profile.items)
}

export default ProfilePage
