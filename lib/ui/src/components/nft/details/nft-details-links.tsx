import { SizeLG } from '../../../constants/size'
import { BlurIcon } from '../../base/icons/blur-icon'
import { OpenSeaIcon } from '../../base/icons/open-sea-icon'
import { ExternalLink } from '../../base/link/external-link'
import { HideIfNil } from '../../base/utils/hide-if-nil'
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
