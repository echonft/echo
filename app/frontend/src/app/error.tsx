'use client'
import { Error as ErrorComponent } from '@echo/ui/components/error/error'

interface Props {
  error: Error & Partial<Record<'digest', string>>
  reset: VoidFunction
}

export default function ({ error, reset }: Props) {
  return <ErrorComponent error={error} reset={reset} />
}
