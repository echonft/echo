'use client'
import type { WithClassNameProps } from '@echo/ui/types/props/with-class-name-props'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props extends WithClassNameProps {
  show?: boolean
}

export const ImagePlaceholder: FunctionComponent<Props> = ({ className, show }) => {
  if (show) {
    return <div className={clsx('absolute', 'inset-0', 'bg-white/10', 'animate-pulse', className)} />
  }
  return null
}
