import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type UserResponse } from '@echo/api/types/responses/user-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
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

const UserLayout: FunctionComponent<PropsWithChildren<Props>> = async ({ params, children }) => {
  const session = await getServerSession(authOptions)
  const response = await nextFetch.get<UserResponse>(apiUrlProvider.user.get.getUrl(params))
  assertNextFetchResponse(response)
  return (
    <NavigationPageLayout user={session?.user}>
      <SectionLayout>
        <UserDetailsApiProvided user={response.data.user} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default UserLayout
