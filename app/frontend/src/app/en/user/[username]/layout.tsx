import { userApiUrl } from '@echo/api/routing/user-api-url'
import { type UserResponse } from '@echo/api/types/responses/user-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { fetcher } from '@echo/frontend/lib/helpers/fetcher'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { NavigationPageLayout } from '@echo/ui/components/layout/navigation/navigation-page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { UserDetailsApiProvided } from '@echo/ui/components/user/api-provided/user-details-api-provided'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserLayout: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { username }, children }) => {
  const session = await getServerSession(authOptions)
  const { data, error } = await fetcher(userApiUrl(username)).fetch<UserResponse>()

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
    <NavigationPageLayout user={session?.user}>
      <SectionLayout>
        <UserDetailsApiProvided user={data.user} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default UserLayout
