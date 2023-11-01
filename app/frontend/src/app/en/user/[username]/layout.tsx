import { userApiUrl } from '@echo/api/routing/user-api-url'
import { type UserResponse } from '@echo/api/types/responses/user-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { assertFetchResult } from '@echo/frontend/lib/services/fetcher/assert-fetch-result'
import { fetcher } from '@echo/frontend/lib/services/fetcher/fetcher'
import { NavigationPageLayout } from '@echo/ui/components/layout/navigation/navigation-page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { UserDetailsApiProvided } from '@echo/ui/components/user/api-provided/user-details-api-provided'
import { getServerSession } from 'next-auth/next'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserLayout: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { username }, children }) => {
  const session = await getServerSession(authOptions)
  const result = await fetcher(userApiUrl(username)).fetch<UserResponse>()
  assertFetchResult(result)
  return (
    <NavigationPageLayout user={session?.user}>
      <SectionLayout>
        <UserDetailsApiProvided user={result.data.user} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default UserLayout
