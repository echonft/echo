import { fetcher } from '../../../../lib/helpers/fetcher'
import { ErrorStatus } from '../../../../lib/server/constants/error-status'
import { ApiError } from '../../../../lib/server/helpers/error/api-error'
import { GetUserResponse, userApiUrl } from '@echo/api'
import { UserDetailsApiProvided } from '@echo/ui/src/components/user/api-provided/user-details-api-provided'
import { clsx } from 'clsx'
import { notFound } from 'next/navigation'
import { isNil } from 'ramda'
import { FunctionComponent, PropsWithChildren } from 'react'

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
