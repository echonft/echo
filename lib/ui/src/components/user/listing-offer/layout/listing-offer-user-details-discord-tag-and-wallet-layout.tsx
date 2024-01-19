import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ListingOfferUserDetailsDiscordTagAndWalletLayout: FunctionComponent<PropsWithChildren> = ({
  children
}) => {
  return <div className={clsx('flex', 'flex-col', 'gap-2.5', 'py-3')}>{children}</div>
}
