import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { Error404 } from '@echo/ui/components/error/error-404'
import { PageLayout } from '@echo/ui/components/layout/page-layout'

function render() {
  return (
    <PageLayout headerVariants={{ logoOnly: true }}>
      <Error404 />
    </PageLayout>
  )
}

export default withLocale(render)
