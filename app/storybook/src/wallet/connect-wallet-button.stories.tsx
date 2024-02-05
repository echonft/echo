// noinspection JSUnusedGlobalSymbols

import { accountStatusStore } from '@echo/storybook/mocks/stores/account-status-store'
import { authUserStore } from '@echo/storybook/mocks/stores/auth-user-store'
import { errorStore } from '@echo/storybook/mocks/stores/error-store'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { ConnectWalletButton as Component } from '@echo/ui/components/wallet/connect-wallet-button'
import { type Meta, type StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Wallet/Connect Button',
  component: Component,
  argTypes: {
    onClick: {
      table: {
        disable: true
      }
    }
  },
  decorators: [
    (Story) => {
      return (
        <>
          <Story />
          <CalloutManager />
        </>
      )
    }
  ]
}

export default metadata

export const Default: StoryObj<typeof Component> = {
  decorators: [
    (Story) => {
      const { clearWallets } = authUserStore()
      useEffect(() => {
        clearWallets()
      }, [])
      return <Story />
    }
  ],
  render: ({ onClick }) => {
    const { connect, disconnect } = accountStatusStore()
    useEffect(() => {
      return disconnect
    }, [])
    return (
      <Component
        onClick={(event) => {
          onClick?.(event)
          connect()
        }}
      />
    )
  }
}

export const WalletAlreadyLinked: StoryObj<typeof Component> = {
  decorators: [
    (Story) => {
      const { addWallets } = authUserStore()
      useEffect(() => {
        addWallets()
      }, [])
      return <Story />
    }
  ],
  render: ({ onClick }) => {
    const { connect, disconnect } = accountStatusStore()
    const { clearWallets } = authUserStore()
    useEffect(() => {
      return () => {
        disconnect()
        clearWallets()
      }
    }, [])
    return (
      <Component
        onClick={(event) => {
          onClick?.(event)
          connect()
        }}
      />
    )
  }
}

export const GetNonceError: StoryObj<typeof Component> = {
  decorators: [
    (Story) => {
      const { addGetNonceError } = errorStore()
      useEffect(() => {
        addGetNonceError()
      }, [])
      return <Story />
    }
  ],
  render: ({ onClick }) => {
    const { clearGetNonceError } = errorStore()
    const { connect, disconnect } = accountStatusStore()
    useEffect(() => {
      return () => {
        disconnect()
        clearGetNonceError()
      }
    }, [])
    return (
      <Component
        onClick={(event) => {
          onClick?.(event)
          connect()
        }}
      />
    )
  }
}

export const SignNonceError: StoryObj<typeof Component> = {
  decorators: [
    (Story) => {
      const { addSignNonceError } = errorStore()
      useEffect(() => {
        addSignNonceError()
      }, [])
      return <Story />
    }
  ],
  render: ({ onClick }) => {
    const { clearSignNonceError } = errorStore()
    const { connect, disconnect } = accountStatusStore()
    useEffect(() => {
      return () => {
        disconnect()
        clearSignNonceError()
      }
    }, [])
    return (
      <Component
        onClick={(event) => {
          onClick?.(event)
          connect()
        }}
      />
    )
  }
}

export const AddWalletError: StoryObj<typeof Component> = {
  decorators: [
    (Story) => {
      const { addAddWalletError } = errorStore()
      useEffect(() => {
        addAddWalletError()
      }, [])
      return <Story />
    }
  ],
  render: ({ onClick }) => {
    const { clearAddWalletError } = errorStore()
    const { connect, disconnect } = accountStatusStore()
    useEffect(() => {
      return () => {
        disconnect()
        clearAddWalletError()
      }
    }, [])
    return (
      <Component
        onClick={(event) => {
          onClick?.(event)
          connect()
        }}
      />
    )
  }
}
