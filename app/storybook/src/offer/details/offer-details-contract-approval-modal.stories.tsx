// noinspection JSUnusedGlobalSymbols

import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import { nftOwnerMockJohnny } from '@echo/model/mocks/nft-mock'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { OfferDetailsContractApprovalModal as Component } from '@echo/ui/components/offer/details/offer-details-contract-approval-modal'
import { nonEmptyMap } from '@echo/utils/fp/non-empty-map'
import type { Meta, StoryObj } from '@storybook/react'
import { useTranslations } from 'next-intl'
import { assoc, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Modal/Contract Approval/Modal',
  component: Component,
  argTypes: {
    onClose: {
      table: {
        disable: true
      }
    },
    onSuccess: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['items', 'open', 'title', 'subtitle']
    }
  }
}

export default metadata

// FIXME
export const ContractApproval: StoryObj<typeof Component> = {
  render: ({ onSuccess, onClose }) => {
    const t = useTranslations('offer.details.swapModal')
    const items = pipe(
      offerReceiverNftItems,
      nonEmptyMap(pipe(nftItemToNft(nftOwnerMockJohnny), assoc('attributes', [])))
    )(offerMockToJohnnycage)
    return (
      <Component
        items={items}
        open={true}
        title={t('title')}
        subtitle={t('approval.subtitle')}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    )
  }
}
