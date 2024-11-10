import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { User } from '@echo/model/types/user'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import type { PropsWithChildren } from 'react'

interface Props {
  user: User
}

function render({ user, children }: PropsWithChildren<Props>) {
  return (
    <PageLayout>
      <Header user={user} />
      <MainSectionLayout>
        {children}
        <CalloutManager />
      </MainSectionLayout>
    </PageLayout>
  )
}

export default withUser(render)
