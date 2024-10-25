import type { Collection } from '@echo/model/types/collection'

export type CollectionDocumentData = Omit<
  Collection,
  'description' | 'discordUrl' | 'profilePictureUrl' | 'twitterUsername' | 'websiteUrl'
> &
  Partial<Pick<Collection, 'description' | 'discordUrl' | 'profilePictureUrl' | 'twitterUsername' | 'websiteUrl'>>
