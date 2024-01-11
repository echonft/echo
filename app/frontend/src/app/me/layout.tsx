import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { mapFirestoreWalletToWallet } from '@echo/frontend/lib/server/mappers/map-firestore-wallet-to-wallet'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Wallet } from '@echo/model/types/wallet'
import { NavigationPageLayout } from '@echo/ui/components/layout/navigation/navigation-page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { ProfileDetailsApiProvided } from '@echo/ui/components/profile/api-provided/profile-details-api-provided'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { unstable_setRequestLocale } from 'next-intl/server'
import { andThen, map, pipe, prop } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

const ProfileLayout: FunctionComponent<PropsWithChildren> = async ({ children }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  const wallets = await unlessNil<AuthUser, Promise<Wallet[]>>(
    pipe<[AuthUser], string, Promise<WalletDocumentData[]>, Promise<Wallet[]>>(
      prop('username'),
      getWalletsForUser,
      andThen(map(mapFirestoreWalletToWallet))
    )
  )(user)
  return (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <ProfileDetailsApiProvided user={user} wallets={wallets} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default ProfileLayout
