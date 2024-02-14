import { ExternalLink } from '@echo/ui/components/base/external-link'
import { OpenSeaIconSvg } from '@echo/ui/components/base/svg/open-sea-icon-svg'
import { classes } from '@echo/ui/helpers/classes'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { type FunctionComponent } from 'react'

interface Props {
  openSeaUrl: Nullable<string>
}

export const CardOpenSeaIcon: FunctionComponent<Props> = ({ openSeaUrl }) => {
  if (isNilOrEmpty(openSeaUrl)) {
    return null
  }
  return (
    <ExternalLink href={openSeaUrl}>
      <div className={classes('rounded-lg', 'w-max', 'h-max', 'p-1', 'text-yellow-700', 'bg-dark-500')}>
        <OpenSeaIconSvg width={16} height={16} />
      </div>
    </ExternalLink>
  )
}
