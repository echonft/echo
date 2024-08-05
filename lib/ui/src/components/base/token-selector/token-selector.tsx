import { TokenSelectorInfo } from '@echo/ui/components/base/token-selector/token-selector-info'
import { TokenSelectorLayout } from '@echo/ui/components/base/token-selector/token-selector-layout'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  onAddToken?: () => unknown
}

export const TokenSelector: FunctionComponent<Props> = ({ onAddToken }) => {
  const t = useTranslations('tokenSelector')

  return (
    <TokenSelectorLayout>
      <TokenSelectorInfo />
      <>TODO SELECTOR</>
      <button className={clsx('btn-primary-reverse', 'group', 'w-72', 'py-2.5')}>
        <span className={clsx('btn-label-primary-reverse', 'prose-label-md-semi')}>{t('btn')}</span>
      </button>
    </TokenSelectorLayout>
  )
}
