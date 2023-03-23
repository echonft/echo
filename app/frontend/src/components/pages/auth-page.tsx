import { useTranslations } from 'next-intl'
import { FunctionComponent, PropsWithChildren } from 'react'

// TODO Use proper next-auth
export const AuthPage: FunctionComponent<PropsWithChildren> = () => {
  const t = useTranslations('Auth')
  // TODO Design loading
  return (
    <div>
      <span>{t('loading')}</span>
    </div>
  )
}
