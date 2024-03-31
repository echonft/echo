import type { Collection } from '@echo/model/types/collection'
import { Profile } from '@echo/ui/components/base/profile'
import { CollectionLinks, type CollectionLinksProps } from '@echo/ui/components/collection/profile/collection-links'
import { CollectionProfileSupply } from '@echo/ui/components/collection/profile/collection-profile-supply'
import { CollectionProfileVerifiedIcon } from '@echo/ui/components/collection/profile/collection-profile-verified-icon'
import { CollectionProfileDetailsLayout } from '@echo/ui/components/collection/profile/layout/collection-profile-details-layout'
import { CollectionProfileSupplyAndLinksLayout } from '@echo/ui/components/collection/profile/layout/collection-profile-supply-and-links-layout'
import { CollectionProfileTitleLayout } from '@echo/ui/components/collection/profile/layout/collection-profile-title-layout'
import { DEFAULT_COLLECTION_PROFILE_PICTURE_URL } from '@echo/ui/constants/default-collection-profile-picture-url'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface CollectionProfileProps
  extends CollectionLinksProps,
    Pick<Collection, 'name' | 'bannerUrl' | 'totalSupply' | 'verified' | 'profilePictureUrl'> {}

export const CollectionProfile: FunctionComponent<CollectionProfileProps> = ({
  name,
  totalSupply,
  bannerUrl,
  profilePictureUrl,
  twitterUsername,
  discordUrl,
  websiteUrl,
  verified
}) => {
  return (
    <Profile
      banner={{ bannerUrl }}
      picture={{ pictureUrl: profilePictureUrl ?? DEFAULT_COLLECTION_PROFILE_PICTURE_URL, alt: name }}
    >
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
  )
}
