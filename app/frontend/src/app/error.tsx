'use client'
import { Error500 } from '@echo/ui/components/error/error-500'
import { PageLayout } from '@echo/ui/components/layout/page-layout'
import { captureException } from '@sentry/nextjs'
import { type FunctionComponent, useEffect } from 'react'

interface Props {
  error: Error & Partial<Record<'digest', string>>
  reset: VoidFunction
}

const Error: FunctionComponent<Props> = ({ error, reset }) => {
  useEffect(() => {
    captureException(error)
  }, [error])

  return (
    <PageLayout headerVariants={{ logoOnly: true }}>
      <Error500 onReset={reset} />
    </PageLayout>
  )
}

export default Error
