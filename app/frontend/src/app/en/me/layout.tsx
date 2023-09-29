import { authOptions } from '@constants/auth-options'
import { ProfileDetailsApiProvided } from '@echo/ui/components/profile/api-provided/profile-details-api-provided'
import { clsx } from 'clsx'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import type { FunctionComponent, PropsWithChildren } from 'react'

const ProfileLayout: FunctionComponent<PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession(authOptions)
  if (isNil(session) || isNil(session.user)) {
    // TODO redirect to login (modal I guess)
    notFound()
  }

  return (
    <>
      <section className={clsx('w-full')}>
        <ProfileDetailsApiProvided user={session.user} />
      </section>
      <section className={clsx('w-full')}>{children}</section>
    </>
  )
}

export default ProfileLayout
