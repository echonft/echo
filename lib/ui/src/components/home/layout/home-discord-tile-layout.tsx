import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export const HomeDiscordTileLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'grow', 'justify-end')}>{children}</div>
}
