import { LoginButton } from '@components/login-button'
import { Modal } from '@components/modal'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const LoginModal: FunctionComponent = () => {
  const t = useTranslations('Login')
  return <Modal title={t('title')} description={t('description')} renderAccept={() => <LoginButton />} />
}
