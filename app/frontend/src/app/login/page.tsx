import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { User } from '@echo/model/types/user'
import type { SignInQueryParams } from '@echo/routing/types/frontend/query-params/sign-in-query-params'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { HeaderStyle } from '@echo/ui/constants/header-style'
import { LoginPage } from '@echo/ui/pages/login/login-page'
import type { Nullable } from '@echo/utils/types/nullable'

interface Props {
  searchParams: SignInQueryParams
  user: Nullable<User>
}

function render({ searchParams: { callbackUrl }, user }: Props) {
  return (
    <PageLayout>
      <Header style={HeaderStyle.Plain} />
      <MainSectionLayout>
        <LoginPage callbackUrl={callbackUrl} user={user} />
      </MainSectionLayout>
    </PageLayout>
  )
}

export default withUser(render)
