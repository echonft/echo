'use client'
import type { NextErrorParams } from '@echo/frontend/lib/types/next-error-params'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { HeaderStyle } from '@echo/ui/constants/header-style'
import { Error500Page } from '@echo/ui/pages/error/error-500-page'
import { captureException } from '@sentry/nextjs'
import { useEffect } from 'react'

export default function ({ error, reset }: NextErrorParams) {
  useEffect(() => {
    captureException(error)
  }, [error])

  return (
    <PageLayout>
      <Header style={HeaderStyle.Plain} />
      <MainSectionLayout>
        <Error500Page onReset={reset} />
      </MainSectionLayout>
    </PageLayout>
  )
}
