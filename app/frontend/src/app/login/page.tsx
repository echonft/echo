import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import type { NextSearchParams } from '@echo/frontend/lib/types/next-search-params'
import { LoginLayout } from '@echo/ui/components/auth/layout/login-layout'
import { PageLayout } from '@echo/ui/components/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'

async function render({
  searchParams: { callbackUrl }
}: NextSearchParams<{
  callbackUrl?: string
}>) {
  const user = await initializeServerComponent({ getAuthUser: true })
  return (
    <PageLayout headerVariants={{ logoOnly: true }}>
      <SectionLayout>
        <LoginLayout callbackUrl={callbackUrl} user={user} />
      </SectionLayout>
    </PageLayout>
  )
}

export default withLocale(render)
