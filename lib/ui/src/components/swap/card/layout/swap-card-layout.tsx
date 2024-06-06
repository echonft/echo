import { linkProvider } from '@echo/api/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import type { SwapCardProps } from '@echo/ui/components/swap/card/swap-card'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const SwapCardLayout: FunctionComponent<PropsWithChildren<SwapCardProps>> = ({ swap, options, children }) => {
  if (options?.asLink) {
    return (
      <InternalLink path={linkProvider.swap.details.get({ slug: swap.slug })} className={'group'}>
        {children}
      </InternalLink>
    )
  }
  return <>{children}</>
}
