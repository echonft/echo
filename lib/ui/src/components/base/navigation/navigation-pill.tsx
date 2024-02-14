import { InternalLink } from '@echo/ui/components/base/internal-link'
import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

export interface NavigationPillProps {
  name: string
  path: string
  selected?: boolean
}

export const NavigationPill: FunctionComponent<NavigationPillProps> = ({ name, path, selected }) => {
  return (
    <InternalLink path={path} disabled={selected}>
      <button className={classes('pill')} disabled={selected}>
        <span className={classes('prose-label-md', 'text-white', 'select-none')}>{name}</span>
      </button>
    </InternalLink>
  )
}
