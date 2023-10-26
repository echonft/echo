import { messages } from '@echo/bot/messages/en'
import { isDev } from '@echo/utils/constants/is-dev'
import i18next from 'i18next'

export async function initializeTranslations() {
  await i18next.init({
    lng: 'en',
    debug: isDev,
    resources: {
      en: {
        translation: messages
      }
    }
  })
}
