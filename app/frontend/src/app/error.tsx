'use client'
import { ErrorPage } from '@echo/ui/components/layout/error-page'
import { type FunctionComponent } from 'react'

interface Props {
  error: Error & { digest?: string }
  reset: VoidFunction
}

const Error: FunctionComponent<Props> = () => {
  return <ErrorPage />
}

export default Error
