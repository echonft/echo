import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { DetailsPaddedContainer } from '@echo/ui/components/base/layout/details-padded-container'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'

function render() {
  // TODO Design
  return (
    <PageLayout>
      <SectionLayout>
        <DetailsPaddedContainer />
      </SectionLayout>
    </PageLayout>
  )
}

export default withLocale(render)
