import { fetcher } from '../../../../lib/helpers/fetcher'
import { GetUserResponse, userApiUrl } from '@echo/api'
import { UserDetailsApiProvided } from '@echo/ui'
import { clsx } from 'clsx'
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
