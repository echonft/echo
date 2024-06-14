import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { PAGE_LAYOUT_BG_COLLECTIONS } from '@echo/ui/constants/page-layout-background'
import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'

function render({ user, children }: PropsWithUser<WithChildrenProps>) {
  return Promise.resolve(
    <PageLayout user={user} background={PAGE_LAYOUT_BG_COLLECTIONS}>
      <SectionLayout>{children}</SectionLayout>
    </PageLayout>
  )
}

export default withUser(render)
