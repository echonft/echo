/* eslint-disable @typescript-eslint/no-empty-function */
// noinspection JSUnusedGlobalSymbols

import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import {
  ListingDetailsModal,
  type ListingDetailsModalProps
} from '@echo/ui/components/listing/details/modal/listing-details-modal'
import { action } from '@storybook/addon-actions'
import { type Meta, type StoryObj } from '@storybook/react'
import type { FunctionComponent } from 'react'

type ComponentType = FunctionComponent<
  {
    isCreator: boolean
    hasOffers: boolean
  } & Pick<ListingDetailsModalProps, 'actions'>
>
const metadata: Meta<ComponentType> = {
  title: 'Listing/Details/Modal',
  args: {
    isCreator: true,
    hasOffers: true,
    actions: {
      onCancel: action('onCancel'),
      onClose: action('onClose'),
      onFill: action('onFill'),
      onViewOffers: action('onViewOffers')
    }
  },
  argTypes: {
    isCreator: {
      defaultValue: true,
      control: 'boolean'
    },
    hasOffers: {
      defaultValue: true,
      control: 'boolean'
    },
    actions: {
      onCancel: {
        table: {
          disable: true
        }
      },
      onClose: {
        table: {
          disable: true
        }
      },
      onFill: {
        table: {
          disable: true
        }
      },
      onViewOffers: {
        table: {
          disable: true
        }
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['actions']
    }
  }
}

export default metadata
type Story = StoryObj<ComponentType>

export const Default: Story = {
  render: ({ isCreator, hasOffers, actions }) => {
    return (
      <ListingDetailsModal
        open={true}
        listing={getListingMockById('jUzMtPGKM62mMhEcmbN4')}
        user={getAuthUserMockByUsername(isCreator ? 'johnnycagewins' : 'crewnft_')}
        hasOffers={hasOffers}
        actions={actions}
      />
    )
  }
}

export const Mutating: Story = {
  render: ({ isCreator, hasOffers }) => {
    return (
      <ListingDetailsModal
        open={true}
        listing={getListingMockById('jUzMtPGKM62mMhEcmbN4')}
        user={getAuthUserMockByUsername(isCreator ? 'johnnycagewins' : 'crewnft_')}
        hasOffers={hasOffers}
        actions={undefined}
      />
    )
  }
}
