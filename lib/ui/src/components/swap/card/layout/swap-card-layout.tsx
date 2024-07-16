import { pathProvider } from '@echo/api/routing/path-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import type { SwapCardProps } from '@echo/ui/components/swap/card/swap-card'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const SwapCardLayout: FunctionComponent<PropsWithChildren<SwapCardProps>> = ({ swap, options, children }) => {
  if (options?.asLink) {
    return (
      <InternalLink path={pathProvider.swap.details.get({ slug: swap.slug })} className={'group'}>
        {children}
      </InternalLink>
    )
  }
  return <>{children}</>
}
