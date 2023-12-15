import { DiscordIcon } from '@echo/ui/components/base/icons/discord-icon'
import { TwitterIcon } from '@echo/ui/components/base/icons/twitter-icon'
import { WebsiteIcon } from '@echo/ui/components/base/icons/website-icon'
import { ExternalLink } from '@echo/ui/components/base/link/external-link'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { SIZE_MD } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export interface CollectionLinksProps {
  websiteUrl?: string | undefined
  discordUrl?: string | undefined
  twitterUsername?: string | undefined
}

export const CollectionLinks: FunctionComponent<CollectionLinksProps> = ({
  websiteUrl,
  twitterUsername,
  discordUrl
}) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-2')}>
      <HideIfNil
        checks={websiteUrl}
        render={(websiteUrl) => (
          <ExternalLink href={websiteUrl}>
            <WebsiteIcon size={SIZE_MD} />
          </ExternalLink>
        )}
      />

      <HideIfNil
        checks={twitterUsername}
        render={(twitterUsername) => (
          <ExternalLink href={`https://twitter.com/${twitterUsername}`}>
            <TwitterIcon size={SIZE_MD} />
          </ExternalLink>
        )}
      />
      <HideIfNil
        checks={discordUrl}
        render={(discordUrl) => (
          <ExternalLink href={discordUrl}>
            <DiscordIcon size={SIZE_MD} />
          </ExternalLink>
        )}
      />
    </div>
  )
}
