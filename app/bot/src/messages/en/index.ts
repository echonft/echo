export const messages = {
  error: {
    invalidButtonAction: 'Invalid button action',
    invalidButtonData: 'Invalid button data',
    invalidButtonId: 'Invalid button interaction',
    invalidChannelId: 'Invalid channel id',
    invalidGuildId: 'Invalid guild id'
  },
  listing: {
    button: 'View listing',
    embed: {
      title: 'A new listing was created',
      description: 'Created by {{- user}}',
      items: {
        name: 'Offering'
      },
      target: {
        name: 'Looking for',
        value_one: '1 NFT from {{collectionName}}',
        value_other: '{{count}} NFTs from {{collectionName}}'
      }
    }
  },
  offer: {
    button: 'View offer',
    thread: {
      close: '_This thread will automatically close soon._',
      message:
        '{{- sender}} made you an offer {{- receiver}}. You can use this thread to discuss it, and hopefully come' +
        ' to an agreement. Happy swapping!',
      name: 'offer-{{timestamp}}',
      redeemable: {
        single: '{{- redeemer}} still has NFTs to redeem. Once this is done, thread will close automatically.',
        multiple:
          '{{- sender}} and {{- receiver}} still have NFTs to redeem. Once this is done, thread will close automatically.'
      }
    },
    update: {
      ACCEPTED: '@here {{- receiver}} accepted the offer! You can now execute the swap.',
      CANCELLED: '@here The offer was cancelled.',
      EXPIRED:
        "@here The offer expired.\n There are still NFTs in escrow, we'll close the thread once all NFTs are redemeed.",
      REDEEMED: '@here ',
      REJECTED: '@here {{- receiver}} rejected the offer.',
      COMPLETED: '@here The swap is now completed. Congratulations to the both of you!'
    }
  },
  swap: {
    embed: {
      title: 'A new swap was made',
      description: 'Between {{- creator}} and {{- counterparty}}',
      senderItems: 'Swapped',
      receiverItems: 'For'
    }
  }
}
