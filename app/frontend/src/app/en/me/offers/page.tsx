import { links } from '@echo/ui/constants/links'
import { redirect } from 'next/navigation'
import { type FunctionComponent } from 'react'

const ProfileOffersPage: FunctionComponent = () => {
  redirect(links.profile.offersCreated)
}

export default ProfileOffersPage
