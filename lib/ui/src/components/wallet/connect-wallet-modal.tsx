'use client'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ModalSubtitle } from '@echo/ui/components/base/modal/modal-subtitle'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { classes } from '@echo/ui/helpers/classes'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  open: boolean
  onClose?: EmptyFunction
}

export const ConnectWalletModal: FunctionComponent<Props> = ({ open, onClose }) => {
  const t = useTranslations('wallet.modal')

  return (
    <Modal open={open} onClose={onClose} title={t('title')}>
      <div className={classes('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('subtitle')}</ModalSubtitle>
        <ConnectWalletButton />
      </div>
    </Modal>
  )
}
