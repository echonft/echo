// noinspection JSUnusedGlobalSymbols

import { getOfferMock } from '@echo/model-mocks/offer/get-offer-mock'
import { OfferDetailsContractApprovalModal as Component } from '@echo/ui/components/offer/details/offer-details-contract-approval-modal'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3/types/approve-erc-721-contract-args'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/types/get-erc-721-contract-approval-args'
import type { Meta, StoryObj } from '@storybook/react'
import { useTranslations } from 'next-intl'

function getErc721ContractApproval(_args: GetErc721ContractApprovalArgs): Promise<boolean> {
  return delayPromise(Promise.resolve(false), 1200)
}
function approveErc721Contract(_args: ApproveErc721ContractArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 1200)
}

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Modal/Accept/Contract Approval Check',
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
  component: Component,
  parameters: {
    controls: {
      exclude: ['items', 'open', 'title', 'subtitle', 'fetcher']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const ContractApprovalCheck: Story = {
  render: ({ onSuccess, onClose }) => {
    const t = useTranslations('offer.details.acceptModal')
    return (
      <Component
        items={getOfferMock().receiverItems}
        open={true}
        title={t('title')}
        subtitle={t('approval.subtitle')}
        fetcher={{
          approveErc721Contract,
          getErc721ContractApproval
        }}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    )
  }
}
