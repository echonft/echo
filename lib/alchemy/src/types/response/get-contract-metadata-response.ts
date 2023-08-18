import { NftCollection } from '@echo/firestore'

export type GetContractMetadataResponse = Omit<
  NftCollection,
  'id' | 'bannerUrl' | 'blurUrl' | 'discordGuild' | 'openSeaUrl' | 'slug'
>
