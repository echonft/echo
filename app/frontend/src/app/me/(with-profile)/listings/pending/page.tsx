import { getPendingListingsForUser } from '@echo/firestore/crud/listing/get-pending-listings-for-user'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import { ProfileListingsReceivedApiProvided } from '@echo/ui/components/profile/api-provided/profile-listings-received-api-provided'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { path, pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render(params: NextAuthUserParams) {
  const listings = await pipe(nonNullableReturn(path(['user', 'username'])), getPendingListingsForUser)(params)
  return <ProfileListingsReceivedApiProvided listings={listings} user={params.user} />
}

export default pipe(withLocale<NextAuthUserParams, Promise<ReactElement>>, withUser)(render)
