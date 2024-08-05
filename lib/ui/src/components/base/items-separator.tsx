import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const ItemsSeparator: FunctionComponent = () => (
  <div className={clsx('w-[0.1875rem]', 'bg-gradient-to-b', 'from-yellow-500', 'to-transparent', 'flex-none')} />
)
