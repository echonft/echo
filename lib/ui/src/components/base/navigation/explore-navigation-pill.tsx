import { InternalLink } from '@echo/ui/components/base/internal-link'
import type { NavigationPillProps } from '@echo/ui/components/base/navigation/navigation-pill'
import { ExploreIconSvg } from '@echo/ui/components/base/svg/explore-icon-svg'
import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

export const ExploreNavigationPill: FunctionComponent<NavigationPillProps> = ({ name, path, selected }) => {
  return (
    <InternalLink path={path} disabled={selected}>
      <button className={classes('pill', 'flex', 'flex-row', 'gap-2.5', 'items-center')} disabled={selected}>
        <span className={classes('prose-label-md', 'text-yellow-500', 'select-none')}>{name}</span>
        <span className={classes('text-yellow-500', 'select-none')}>
          <ExploreIconSvg />
        </span>
      </button>
    </InternalLink>
  )
}
