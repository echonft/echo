import { authOptions } from '@constants/auth-options'
import { ProfileDetails } from '@echo/ui/components/profile/details/profile-details'
import { SizeLG } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { head, isEmpty, isNil } from 'ramda'
import type { FunctionComponent, PropsWithChildren } from 'react'

const UserLayout: FunctionComponent<PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession(authOptions)

  if (isNil(session) || isNil(session.user)) {
    // TODO redirect to login (modal I guess)
    notFound()
  }

  const { discordUsername, discordBanner, discordId, discordAvatar, wallets } = session.user
  return (
    <>
      <section className={clsx('w-full')}>
        <ProfileDetails
          discordUsername={discordUsername}
          discordBanner={discordBanner}
          discordId={discordId}
          discordAvatar={discordAvatar}
          wallet={isEmpty(wallets) ? undefined : head(wallets)}
          size={SizeLG}
        />
      </section>
      <section className={clsx('w-full')}>{children}</section>
    </>
  )
}

export default UserLayout
