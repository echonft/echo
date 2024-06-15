import { Error404 } from '@echo/ui/components/base/error/error-404'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'

export default function render() {
  return (
    <PageLayout headerVariants={{ logoOnly: true }}>
      <Error404 />
    </PageLayout>
  )
}
