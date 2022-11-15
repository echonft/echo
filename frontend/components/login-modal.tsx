import { LoginButton } from '@echo/frontend/components/login-button'
import { Modal } from '@echo/frontend/components/modal'
import React from 'react'
import { useTranslations } from 'use-intl'

export const LoginModal: React.FunctionComponent = () => {
  const t = useTranslations('Login')
  return <Modal title={t('title')} description={t('description')} renderAccept={() => <LoginButton />} />
}
