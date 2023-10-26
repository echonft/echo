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
      label: 'View listing'
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
    button: {
      label: 'View offer'
    },
    thread: {
      close: '_This thread will automatically close soon._',
      message:
        '{{sender}} made you an offer {{receiver}}. You can use this thread to discuss it, and hopefully come' +
        ' to an agreement. Happy swapping!',
      name: 'offer-{{timestamp}}'
    },
    update: {
      ACCEPTED: '<@here> {{receiver}} accepted the offer! You can now execute the swap.',
      CANCELLED: '<@here> The offer was cancelled.',
      REJECTED: '<@here> {{receiver}} rejected the offer.',
      COMPLETED: '<@here> The swap is now completed. Congratulations to the both of you!'
    }
  }
}
