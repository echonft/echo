import { linkProvider } from '@echo/api/services/routing/link-provider'
import { redirect } from 'next/navigation'
import { type FunctionComponent } from 'react'

const ProfileListingsPage: FunctionComponent = () => {
  redirect(linkProvider.profile.listingsCreated.get())
}

export default ProfileListingsPage
