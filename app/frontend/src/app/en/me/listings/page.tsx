import { links } from '@echo/ui/src/constants/links'
import { redirect } from 'next/navigation'
import type { FunctionComponent } from 'react'

const ProfileListingsPage: FunctionComponent = () => {
  redirect(links.profile.listingsCreated)
}

export default ProfileListingsPage
