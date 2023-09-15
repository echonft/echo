import { userApiUrl } from '@echo/api/routing/user-api-url'
import type { GetUserResponse } from '@echo/api/types/responses/get-user-response'
import { UserDetailsApiProvided } from '@echo/ui/components/user/api-provided/user-details-api-provided'
import { fetcher } from '@helpers/fetcher'
import { ErrorStatus } from '@server/constants/error-status'
import { ApiError } from '@server/helpers/error/api-error'
import { clsx } from 'clsx'
import { notFound } from 'next/navigation'
import { isNil } from 'ramda'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserLayout: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { username }, children }) => {
  const { data, error } = await fetcher(userApiUrl(username)).fetch<GetUserResponse>()

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
        <UserDetailsApiProvided response={data.user} />
      </section>
      <section className={clsx('w-full')}>{children}</section>
    </>
  )
}

export default UserLayout
