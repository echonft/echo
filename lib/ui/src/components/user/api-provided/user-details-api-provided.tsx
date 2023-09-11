import { SizeLG } from '../../../constants/size'
import { UserDetails } from '../details/user-details'
import type { UserResponse } from '@echo/api/types'
import { mapUser } from '@echo/ui-model'
import { FunctionComponent, useMemo } from 'react'

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
