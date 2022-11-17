import { getOffer } from '@echo/firebase/admin/getters/get-offer'
import { ButtonAction, buttonIdPrefixes, ButtonWithData } from 'models/button-action'
import { drop } from 'ramda'

/**
 * Parse the button custom id into a button with data object
 * @param customId The button custom id
 */
export async function parseButtonCustomId(customId: string): Promise<ButtonWithData | undefined> {
  const { action, data } = isCustomIdValid(customId)
  switch (action) {
    case ButtonAction.BUY:
      return { action, offer: await getOffer(data[0]) }
    case ButtonAction.REJECT:
      return undefined
    default:
      return undefined
  }
}

/**
 * Parse the id into an action and data.
 * @param customId The button custom id
 * TODO Typing is bit bad here
 */
function isCustomIdValid(customId: string): { action: ButtonAction | undefined; data: string[] } {
  if (!buttonIdPrefixes.some((prefix) => customId.startsWith(prefix))) {
    return { action: undefined, data: [] }
  }
  const splitId = customId.split('-')
  return { action: splitId[0] as ButtonAction, data: drop(1, splitId) }
}
