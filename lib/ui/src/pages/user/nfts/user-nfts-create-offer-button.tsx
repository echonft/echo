import { CreateOfferButton, type CreateOfferButtonProps } from '@echo/ui/components/nft/selection/create-offer-button'
import type { FunctionComponent } from 'react'

interface Props extends CreateOfferButtonProps {
  isAuthUser: boolean
}

export const UserNftsCreateOfferButton: FunctionComponent<Props> = ({ isAuthUser, ...rest }) => {
  if (isAuthUser) {
    return null
  }
  return <CreateOfferButton {...rest} />
}
