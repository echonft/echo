import { authOptions } from '@constants/auth-options'
import { userApiUrl } from '@echo/api/routing/user-api-url'
import { GetUserResponse } from '@echo/api/types/responses/get-user-response'
import { ProfileDetailsApiProvided } from '@echo/ui/components/profile/api-provided/profile-details-api-provided'
import { fetcher } from '@helpers/fetcher'
import { ErrorStatus } from '@server/constants/error-status'
import { ApiError } from '@server/helpers/error/api-error'
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

  const { data, error } = await fetcher(userApiUrl(session.user.name)).fetch<GetUserResponse>()
  if (isNil(data)) {
    if (!isNil(error)) {
      if ((error as ApiError).status === ErrorStatus.NOT_FOUND) {
        notFound()
      }
      throw Error(error.message)
    }
    throw Error()
  }

  return (
    <>
      <section className={clsx('w-full')}>
        <ProfileDetailsApiProvided response={data.user} />
      </section>
      <section className={clsx('w-full')}>{children}</section>
    </>
  )
}

export default ProfileLayout
