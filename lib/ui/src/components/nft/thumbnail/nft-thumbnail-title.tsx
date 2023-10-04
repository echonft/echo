import { OpenSeaIcon } from '@echo/ui/components/base/icons/open-sea-icon'
import { ExternalLink } from '@echo/ui/components/base/link/external-link'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { SizeSM } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  openSeaUrl: string | undefined
  collectionName: string
  tokenId: number
}

export const NftThumbnailTitle: FunctionComponent<Props> = ({ collectionName, tokenId, openSeaUrl }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'w-full',
        'justify-between',
        'items-center',
        'h-max',
        'bg-white/[0.08]',
        'p-2',
        'gap-2'
      )}
    >
      <div className={clsx('flex', 'flex-row', 'gap-1', 'min-w-0')}>
        <span className={clsx('prose-label-md', 'text-white/[0.65]', 'truncate')}>{collectionName}</span>
        <span className={clsx('prose-label-md-semi', 'text-white')}>{`#${tokenId}`}</span>
      </div>
      <HideIfNil
        checks={openSeaUrl}
        render={(openSeaUrl) => (
          <ExternalLink href={openSeaUrl}>
            <OpenSeaIcon size={SizeSM} />
          </ExternalLink>
        )}
      />
    </div>
  )
}
