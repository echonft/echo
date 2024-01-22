import { linkProvider } from '@echo/api/services/routing/link-provider'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import { getAuthUser } from '@echo/frontend/lib/auth/get-auth-user'
import { withFirebase } from '@echo/frontend/lib/hoc/with-firebase'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { UserSwapsApiProvided } from '@echo/ui/components/user/api-provided/user-swaps-api-provided'
import { redirect } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserSwapsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  if (user?.username === username) {
    redirect(linkProvider.profile.swaps.get())
  }
  const offers = await getOffersForUser(
    username,
    { state: [OFFER_STATE_COMPLETED] },
    {
      orderBy: [{ field: 'expiresAt', direction: 'desc' }]
    }
  )
  return <UserSwapsApiProvided username={username} offers={offers} />
}

export default withFirebase(UserSwapsPage)
