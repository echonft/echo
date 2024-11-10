import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { HeaderStyle } from '@echo/ui/constants/header-style'
import { Error404Page } from '@echo/ui/pages/error/error-404-page'

export default function render() {
  return (
    <PageLayout>
      <Header style={HeaderStyle.Plain} />
      <MainSectionLayout>
        <Error404Page />
      </MainSectionLayout>
    </PageLayout>
  )
}
