import { ExternalLink } from '../../base/external-link'
import { HideIfNil } from '../../base/hide-if-nil'
import { BlurIcon } from '../../base/icons/blur-icon'
import { OpenSeaIcon } from '../../base/icons/open-sea-icon'
import { SizeLG } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftDetailsLinksProps {
  openSeaUrl?: URL
  blurUrl?: URL
}

export const NftDetailsLinks: FunctionComponent<NftDetailsLinksProps> = ({ openSeaUrl, blurUrl }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-5', 'items-center')}>
      <HideIfNil
        checks={openSeaUrl}
        render={(openSeaUrl) => (
          <ExternalLink href={openSeaUrl.href}>
            <OpenSeaIcon size={SizeLG} />
          </ExternalLink>
        )}
      />
      <HideIfNil
        checks={blurUrl}
        render={(blurUrl) => (
          <ExternalLink href={blurUrl.href}>
            <BlurIcon size={SizeLG} />
          </ExternalLink>
        )}
      />
    </div>
  )
}
