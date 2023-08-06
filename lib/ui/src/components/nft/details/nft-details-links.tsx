import { SizeLG } from '../../../types/size'
import { ExternalLink } from '../../base/external-link'
import { BlurIcon } from '../../base/icons/blur-icon'
import { OpenSeaIcon } from '../../base/icons/open-sea-icon'
import { HideIfNilOrEmpty } from '../../utils/hide-if-nil-or-empty'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftDetailsLinksProps {
  openSeaUrl?: URL
  blurUrl?: URL
}

export const NftDetailsLinks: FunctionComponent<NftDetailsLinksProps> = ({ openSeaUrl, blurUrl }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-5', 'items-center')}>
      <HideIfNilOrEmpty
        checks={openSeaUrl}
        render={() => (
          <ExternalLink href={openSeaUrl!.href}>
            <OpenSeaIcon size={SizeLG} />
          </ExternalLink>
        )}
      />
      <HideIfNilOrEmpty
        checks={blurUrl}
        render={() => (
          <ExternalLink href={blurUrl!.href}>
            <BlurIcon size={SizeLG} />
          </ExternalLink>
        )}
      />
    </div>
  )
}
