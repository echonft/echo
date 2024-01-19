import { linkProvider } from '@echo/api/services/routing/link-provider'
import { redirect } from 'next/navigation'
import { type FunctionComponent } from 'react'

const ProfileOffersPage: FunctionComponent = () => {
  redirect(linkProvider.profile.offersCreated.get())
}

export default ProfileOffersPage
