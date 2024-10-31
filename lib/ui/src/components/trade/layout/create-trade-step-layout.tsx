import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CreateTradeStepLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div className={clsx('flex-grow', 'overflow-y-auto', 'pb-32', 'px-16')}>{children}</div>
)
