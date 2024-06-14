import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import type { WithSearchParamsProps } from '@echo/frontend/lib/types/with-search-params-props'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { LoginPage } from '@echo/ui/pages/login/login-page'

function render({
  searchParams: { callbackUrl },
  user
}: PropsWithUser<
  WithSearchParamsProps<{
    callbackUrl?: string
  }>
>) {
  return Promise.resolve(
    <PageLayout headerVariants={{ logoOnly: true }}>
      <SectionLayout>
        <LoginPage callbackUrl={callbackUrl} user={user} />
      </SectionLayout>
    </PageLayout>
  )
}

export default withUser(render)
