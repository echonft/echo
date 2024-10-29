'use client'
import type { NextErrorParams } from '@echo/frontend/lib/types/next-error-params'
import { Error500Page } from '@echo/ui/pages/error/error-500-page'
import { captureException } from '@sentry/nextjs'
import { useEffect } from 'react'

export default function ({ error, reset }: NextErrorParams) {
  useEffect(() => {
    captureException(error)
  }, [error])

  return <Error500Page onReset={reset} />
}
