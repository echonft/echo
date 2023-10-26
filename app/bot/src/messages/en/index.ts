export const messages = {
  error: {
    invalidButtonAction: 'Invalid button action',
    invalidButtonData: 'Invalid button data',
    invalidButtonId: 'Invalid button interaction',
    invalidChannelId: 'Invalid channel id',
    invalidGuildId: 'Invalid guild id'
  },
  listing: {
    button: {
      label: 'View on Echo'
    },
    embed: {
      title: 'A new listing was created',
      description: 'Created by {{user}}',
      items: {
        name: 'Offering'
      },
      targets: {
        name: 'Looking',
        value_one: 'Any NFT from {{collectionName}}',
        value_other: '{{count}} NFTs from {{collectionName}}'
      }
    }
  },
  offer: {
    thread: {
      title: 'offer-{{offerId}}',
      reason: `Private thread to negotiate the offer. You can see the offer here: {{link}}`
    }
  }
}
