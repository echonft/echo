import type { User } from '@echo/auth/types/user'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { LoginPage } from '@echo/ui/pages/login/login-page'
import type { Nullable } from '@echo/utils/types/nullable'

interface Props {
  searchParams: {
    callbackUrl?: string
  }
  user: Nullable<User>
}

function render({ searchParams: { callbackUrl }, user }: Props) {
  return Promise.resolve(
    <PageLayout headerVariants={{ logoOnly: true }}>
      <SectionLayout>
        <LoginPage callbackUrl={callbackUrl} user={user} />
      </SectionLayout>
    </PageLayout>
  )
}

export default withUser(render)
