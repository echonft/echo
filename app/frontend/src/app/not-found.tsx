import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { Error404 } from '@echo/ui/components/error/error-404'
import { PageLayout } from '@echo/ui/components/layout/page-layout'

async function render() {
  await initializeServerComponent()
  return (
    <PageLayout headerVariants={{ logoOnly: true }}>
      <Error404 />
    </PageLayout>
  )
}

export default withLocale(render)
