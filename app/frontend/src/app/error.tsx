'use client'
import { ErrorPage } from '@echo/ui/components/page/error-page'
import { captureException } from '@sentry/nextjs'
import { type FunctionComponent, useEffect } from 'react'

interface Props {
  error: Error & Partial<Record<'digest', string>>
  reset: VoidFunction
}

const Error: FunctionComponent<Props> = ({ error }) => {
  useEffect(() => {
    captureException(error)
  }, [error])

  return <ErrorPage />
}

export default Error
