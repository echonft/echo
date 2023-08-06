export const messages = {
  chain: {
    name: {
      // FIXME Shouldn't be there IMO
      id1: 'Ethereum'
    }
  },
  collection: {
    button: {
      makeOffer: {
        label: 'Make an offer'
      }
    },
    details: {
      size: '{size, number, ::K} NFTs'
    },
    filters: {
      traits: {
        button: {
          title: '{trait}{count, plural, =0 {} other { (# selected)}}'
        },
        title: 'Attributes'
      }
    }
  },
  layout: {
    header: {
      connectButton: 'Connect',
      searchInput: 'Search for a collection or a user'
    }
  },
  nft: {
    details: {
      attributes: {
        title: 'Attributes'
      },
      makeOfferBtn: 'Make an offer',
      offers: {
        title: 'Latest offers',
        empty: 'No offers made yet',
        by: 'By',
        expiresIn: 'Expires {time}'
      },
      tokenDetails: {
        title: 'Token Details',
        tokenId: 'Token ID',
        blockchain: 'Blockchain',
        tokenType: 'Token Standard'
      }
    },
    thumbnail: {
      makeOfferBtn: 'Make an offer'
    }
  }
}
