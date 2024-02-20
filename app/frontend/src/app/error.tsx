'use client'
import type { NextErrorParams } from '@echo/frontend/lib/types/next-error-params'
import { Error500 } from '@echo/ui/components/base/error/error-500'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { captureException } from '@sentry/nextjs'
import { useEffect } from 'react'

// eslint-disable-next-line react/display-name,import/no-anonymous-default-export
export default function ({ error, reset }: NextErrorParams) {
  useEffect(() => {
    captureException(error)
  }, [error])

  return (
    <PageLayout headerVariants={{ logoOnly: true }}>
      <Error500 onReset={reset} />
    </PageLayout>
  )
}
