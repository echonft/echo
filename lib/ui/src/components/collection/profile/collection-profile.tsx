import type { Collection } from '@echo/model/types/collection'
import { PaddedLayout } from '@echo/ui/components/base/layout/padded-layout'
import { Profile } from '@echo/ui/components/base/profile'
import { CollectionLinks, type CollectionLinksProps } from '@echo/ui/components/collection/profile/collection-links'
import { CollectionProfileSupply } from '@echo/ui/components/collection/profile/collection-profile-supply'
import { CollectionProfileVerifiedIcon } from '@echo/ui/components/collection/profile/collection-profile-verified-icon'
import { CollectionProfileDetailsLayout } from '@echo/ui/components/collection/profile/layout/collection-profile-details-layout'
import { CollectionProfileSupplyAndLinksLayout } from '@echo/ui/components/collection/profile/layout/collection-profile-supply-and-links-layout'
import { CollectionProfileTitleLayout } from '@echo/ui/components/collection/profile/layout/collection-profile-title-layout'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface CollectionProfileProps
  extends CollectionLinksProps,
    Pick<Collection, 'name' | 'totalSupply' | 'verified' | 'pictureUrl'> {}

export const CollectionProfile: FunctionComponent<CollectionProfileProps> = ({
  name,
  totalSupply,
  pictureUrl,
  twitterUsername,
  discordUrl,
  websiteUrl,
  verified
}) => {
  return (
    <PaddedLayout>
      <Profile picture={{ pictureUrl: pictureUrl, alt: name }}>
        <CollectionProfileDetailsLayout>
          <CollectionProfileTitleLayout>
            <h1 className={clsx('text-white', 'prose-display-lg-bold', 'uppercase', 'truncate')}>{name}</h1>
            <CollectionProfileVerifiedIcon verified={verified} />
          </CollectionProfileTitleLayout>
          <CollectionProfileSupplyAndLinksLayout>
            <CollectionProfileSupply totalSupply={totalSupply} />
            <CollectionLinks twitterUsername={twitterUsername} discordUrl={discordUrl} websiteUrl={websiteUrl} />
          </CollectionProfileSupplyAndLinksLayout>
        </CollectionProfileDetailsLayout>
      </Profile>
    </PaddedLayout>
  )
}
