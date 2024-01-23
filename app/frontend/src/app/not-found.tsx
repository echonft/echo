import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { Error404 } from '@echo/ui/components/error/error-404'
import { PageLayout } from '@echo/ui/components/layout/page-layout'

export default async function () {
  await initializeServerComponent()
  return (
    <PageLayout headerVariants={{ logoOnly: true }}>
      <Error404 />
    </PageLayout>
  )
}
