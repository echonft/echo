import { linkProvider } from '@echo/api/services/routing/link-provider'
import { redirect } from 'next/navigation'
import { type FunctionComponent } from 'react'

const ProfilePage: FunctionComponent = () => {
  redirect(linkProvider.profile.items.get())
}

export default ProfilePage
