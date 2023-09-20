import type { UserResponse } from '@echo/api/types/responses/model/user-response'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { SizeLG } from '@echo/ui/constants/size'
import { mapUserFromResponse } from '@echo/ui/mappers/from-api/map-user-from-response'
import { head, isNil } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  response: UserResponse
}

export const UserDetailsApiProvided: FunctionComponent<Props> = ({ response }) => {
  const user = useMemo(() => mapUserFromResponse(response), [response])
  const { discordUsername, discordBanner, discordId, discordAvatar, wallets } = user
  return (
    <UserDetails
      discordUsername={discordUsername}
      discordBanner={discordBanner}
      discordId={discordId}
      discordAvatar={discordAvatar}
      wallet={isNil(wallets) ? undefined : head(wallets)}
      size={SizeLG}
    />
  )
}
