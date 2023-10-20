import { BlurIcon } from '@echo/ui/components/base/icons/blur-icon'
import { OpenSeaIcon } from '@echo/ui/components/base/icons/open-sea-icon'
import { ExternalLink } from '@echo/ui/components/base/link/external-link'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { SizeLG } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export interface NftDetailsLinksProps {
  openSeaUrl?: string
  blurUrl?: string
}

export const NftDetailsLinks: FunctionComponent<NftDetailsLinksProps> = ({ openSeaUrl, blurUrl }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-5', 'items-center')}>
      <HideIfNil
        checks={openSeaUrl}
        render={(openSeaUrl) => (
          <ExternalLink href={openSeaUrl}>
            <OpenSeaIcon size={SizeLG} />
          </ExternalLink>
        )}
      />
      <HideIfNil
        checks={blurUrl}
        render={(blurUrl) => (
          <ExternalLink href={blurUrl}>
            <BlurIcon size={SizeLG} />
          </ExternalLink>
        )}
      />
    </div>
  )
}
