'use client'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  show?: boolean
}

export const ImagePlaceholder: FunctionComponent<Props> = ({ show }) => {
  if (show) {
    return <div className={clsx('rounded-2xl', 'absolute', 'inset-0', 'bg-white/10', 'animate-pulse')} />
  }
  return null
}
