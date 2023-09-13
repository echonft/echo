import type { UserResponse } from '@echo/api/types/responses/model/user-response'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { SizeLG } from '@echo/ui/constants/size'
import { mapUser } from '@echo/ui/mappers/from-api/map-user'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  response: UserResponse
}

export const UserDetailsApiProvided: FunctionComponent<Props> = ({ response }) => {
  const user = useMemo(() => mapUser(response), [response])
  const { discordUsername, discordBanner, discordId, discordAvatar, wallet } = user
  return (
    <UserDetails
      discordUsername={discordUsername}
      discordBanner={discordBanner}
      discordId={discordId}
      discordAvatar={discordAvatar}
      wallet={wallet}
      size={SizeLG}
    />
  )
}
