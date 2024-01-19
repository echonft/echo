import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type UserResponse } from '@echo/api/types/responses/user-response'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { getCookieHeader } from '@echo/frontend/lib/helpers/auth/get-cookie-header'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/navigation/navigation-page-layout'
import { UserDetailsApiProvided } from '@echo/ui/components/user/api-provided/user-details-api-provided'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserLayout: FunctionComponent<PropsWithChildren<Props>> = async ({ params, children }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  const response = await nextFetch.get<UserResponse>(apiUrlProvider.user.get.getUrl(params), {
    cookie: getCookieHeader()
  })
  assertNextFetchResponse(response)
  return (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <UserDetailsApiProvided user={response.data.user} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default UserLayout
