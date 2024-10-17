import type { ListingRole } from '@echo/model/constants/listing-role'
import type { Listing } from '@echo/model/types/listing/listing'
import type { Nullable } from '@echo/utils/types/nullable'

export interface ListingWithRole extends Listing {
  role: Nullable<ListingRole>
}
