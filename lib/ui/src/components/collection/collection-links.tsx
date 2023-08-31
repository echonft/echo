import { ExternalLink } from '../base/external-link'
import { HideIfNil } from '../base/hide-if-nil'
import { DiscordIcon } from '../base/icons/discord-icon'
import { TwitterIcon } from '../base/icons/twitter-icon'
import { WebsiteIcon } from '../base/icons/website-icon'
import { SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface CollectionLinksProps {
  websiteUrl?: URL | undefined
  discordUrl?: URL | undefined
  twitterUsername?: string | undefined
}

export const CollectionLinks: FunctionComponent<CollectionLinksProps> = ({
  websiteUrl,
  twitterUsername,
  discordUrl
}) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-2')}>
      <HideIfNil checks={websiteUrl}>
        <ExternalLink href={websiteUrl!.href}>
          <WebsiteIcon size={SizeMD} />
        </ExternalLink>
      </HideIfNil>
      <HideIfNil checks={twitterUsername}>
        <ExternalLink href={`https://twitter.com/${twitterUsername!}`}>
          <TwitterIcon size={SizeMD} />
        </ExternalLink>
      </HideIfNil>
      <HideIfNil checks={discordUrl}>
        <ExternalLink href={discordUrl!.href}>
          <DiscordIcon size={SizeMD} />
        </ExternalLink>
      </HideIfNil>
    </div>
  )
}
