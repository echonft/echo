'use client'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { HeaderStyle } from '@echo/ui/constants/header-style'
import { captureError } from '@echo/ui/helpers/capture-error'
import { Error500Page } from '@echo/ui/pages/error/error-500-page'
import { type FunctionComponent, useEffect } from 'react'

interface Props {
  error: Error & Partial<Record<'digest', string>>
  reset: VoidFunction
}

export const Error: FunctionComponent<Props> = ({ error, reset }) => {
  useEffect(() => {
    captureError(error)
  }, [error])

  return (
    <PageLayout>
      <Header options={HeaderStyle.Plain} />
      <MainSectionLayout>
        <Error500Page onReset={reset} />
      </MainSectionLayout>
    </PageLayout>
  )
}
