import { SizeMD } from '../../types/size'
import { ExternalLink } from '../base/external-link'
import { DiscordIcon } from '../base/icons/discord-icon'
import { TwitterIcon } from '../base/icons/twitter-icon'
import { WebsiteIcon } from '../base/icons/website-icon'
import { HideIfNilOrEmpty } from '../utils/hide-if-nil-or-empty'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface CollectionLinksProps {
  websiteUrl?: string
  discordUrl?: string
  twitterUsername?: string
}

export const CollectionLinks: FunctionComponent<CollectionLinksProps> = ({
  websiteUrl,
  twitterUsername,
  discordUrl
}) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-2')}>
      <HideIfNilOrEmpty checks={websiteUrl}>
        <ExternalLink href={websiteUrl!}>
          <WebsiteIcon size={SizeMD} />
        </ExternalLink>
      </HideIfNilOrEmpty>
      <HideIfNilOrEmpty checks={twitterUsername}>
        <ExternalLink href={`https://twitter.com/${twitterUsername!}`}>
          <TwitterIcon size={SizeMD} />
        </ExternalLink>
      </HideIfNilOrEmpty>
      <HideIfNilOrEmpty checks={discordUrl}>
        <ExternalLink href={discordUrl!}>
          <DiscordIcon size={SizeMD} />
        </ExternalLink>
      </HideIfNilOrEmpty>
    </div>
  )
}
