import { ExternalLink } from '@echo/ui/components/base/external-link'
import { OpenSeaIconSvg } from '@echo/ui/components/base/svg/open-sea-icon-svg'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  openSeaUrl: Nullable<string>
}

export const CardOpenSeaIcon: FunctionComponent<Props> = ({ openSeaUrl }) => {
  if (isNilOrEmpty(openSeaUrl)) {
    return null
  }
  return (
    <ExternalLink
      href={openSeaUrl}
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <div className={clsx('rounded-lg', 'w-max', 'h-max', 'p-1', 'text-yellow-700', 'bg-dark-500')}>
        <OpenSeaIconSvg width={16} height={16} />
      </div>
    </ExternalLink>
  )
}
