import { SizeLG } from '../../../types/size'
import { ExternalLink } from '../../base/external-link'
import { BlurIcon } from '../../base/icons/blur-icon'
import { OpenSeaIcon } from '../../base/icons/open-sea-icon'
import { HideIfNilOrEmpty } from '../../utils/hide-if-nil-or-empty'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftDetailsLinksProps {
  openSeaUrl?: string
  blurUrl?: string
}

export const NftDetailsLinks: FunctionComponent<NftDetailsLinksProps> = ({ openSeaUrl, blurUrl }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-5')}>
      <HideIfNilOrEmpty checks={openSeaUrl}>
        <ExternalLink href={openSeaUrl!}>
          <OpenSeaIcon size={SizeLG} />
        </ExternalLink>
      </HideIfNilOrEmpty>
      <HideIfNilOrEmpty checks={blurUrl}>
        <ExternalLink href={blurUrl!}>
          <BlurIcon size={SizeLG} />
        </ExternalLink>
      </HideIfNilOrEmpty>
    </div>
  )
}
