import { messages } from '@echo/bot/messages/en'
import i18next from 'i18next'

export async function initializeTranslations() {
  await i18next.init({
    lng: 'en',
    resources: {
      en: {
        translation: messages
      }
    }
  })
}
