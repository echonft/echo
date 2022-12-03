export const messages = {
  Connect: {
    'invalid-redirect': 'Invalid login redirect',
    'error-login': 'Error logging you in',
    signing: 'Signing in...',
    'sign-in': 'Sign in',
    success: "Successfully logged you in, you're all set",
    login: 'Logging in...'
  },
  Auth: {
    loading: 'Loading...'
  },
  Login: {
    title: 'You need to login',
    description:
      'We use ethereum signature to log you in, you will be prompted to sign a message, this is not a transaction and does not require you to pay gas'
  },
  Nfts: {
    loading: 'Loading NFTs...',
    error: 'Error loading NFTs',
    select: 'Select',
    unselect: 'Unselect'
  },
  CreateOffer: {
    'select-title': 'What do you want to do:',
    loading: 'Loading collection data...',
    'error-collection': 'Collection is not setup properly, contact discord admin',
    'error-fetching': 'Error fetching collection',
    buy: {},
    sell: {
      'owner-nfts': 'Your NFTs:',
      'trade-title': 'What do you want to trade it for?',
      'show-nft-button': 'Select specific contracts NFTs',
      autocomplete: {
        placeholder: 'Select the collections you want to trade for',
        'new-option': 'Add collection {collection}',
        'invalid-option': 'You need to enter a contract address'
      },
      submit: 'Submit'
    },
    summary: {
      // TODO add these
      loading: '',
      error: '',
      sell: {
        title: 'You are creating a selling offer',
        description: 'This will not lock your assets, the offer is done offchain. Here is the summary of your offer',
        accept: 'Accept',
        cancel: 'Cancel',
        'owner-title': 'You are selling these NFTs:',
        'counterparty-title': 'You want to trade for these NFTs:',
        'counterparty-title-none': 'You want to trade for ANY NFTs',
        'counterparty-title-no-id': 'You want to trade for NFTs of these collections:'
      },
      buy: {
        title: 'You are creating a buy offer',
        description: 'This will not lock your assets, the offer is done offchain. Here is the summary of your offer',
        accept: 'Accept',
        cancel: 'Cancel',
        'owner-title': 'You want to buy these NFTs:',
        'owner-title-no-id': 'You want to buy ANY NFTs of these collections:',
        'counterparty-title': 'You want to trade for these NFTs:',
        'counterparty-title-none': 'You want to trade for ANY NFTs',
        'counterparty-title-no-id': 'You want to trade for NFTs of these collections:'
      }
    }
  }
}
