import { ExternalLink } from '@echo/ui/components/base/link/external-link'
import { OpenSeaIconSvg } from '@echo/ui/components/base/svg/open-sea-icon-svg'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  openSeaUrl: string
}

export const CardOpenSeaIcon: FunctionComponent<Props> = ({ openSeaUrl }) => {
  return (
    <ExternalLink href={openSeaUrl}>
      <div className={clsx('rounded-lg', 'w-max', 'h-max', 'p-1', 'text-yellow-700', 'bg-dark-500')}>
        <OpenSeaIconSvg width={16} height={16} />
      </div>
    </ExternalLink>
  )
}
