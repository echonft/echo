'use client'
import { Error500Page } from '@echo/ui/pages/error/error-500-page'

interface Props {
  error: Error & Partial<Record<'digest', string>>
  reset: VoidFunction
}

export default function ({ error, reset }: Props) {
  return <Error500Page error={error} reset={reset} />
}
