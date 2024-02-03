// noinspection JSUnusedGlobalSymbols

import { getOfferMock } from '@echo/model-mocks/offer/get-offer-mock'
import { OfferDetailsContractApprovalModal as Component } from '@echo/ui/components/offer/details/offer-details-contract-approval-modal'
import type { Meta, StoryObj } from '@storybook/react'
import { useTranslations } from 'next-intl'

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

export const ContractApproval: StoryObj<typeof Component> = {
  render: ({ onSuccess, onClose }) => {
    const t = useTranslations('offer.details.swapModal')
    return (
      <Component
        items={getOfferMock().receiverItems}
        open={true}
        title={t('title')}
        subtitle={t('approval.subtitle')}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    )
  }
}
