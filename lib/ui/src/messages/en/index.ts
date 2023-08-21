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
  },
  offer: {
    state: {
      OPEN: 'Pending',
      ACCEPTED: 'Accepted',
      CANCELLED: 'Cancelled',
      COMPLETED: 'Completed',
      REJECTED: 'Rejected',
      EXPIRED: 'Expired'
    },
    details: {
      expiresAt: 'Expires in',
      expiredAt: 'Expired'
    },
    new: {
      misc: {
        assetsInSubtitle: 'Your assets',
        assetsInTitle: 'Going out',
        assetsOutSubtitle: "Counterparty's assets",
        assetsOutTitle: 'Going in'
      },
      bottomSlider: {
        title: 'Offer overview',
        add: 'Add more',
        finalize: 'Finalize offer',
        noNftsTitle: 'No NFTs selected yet',
        noNftsButton: 'Select NFTs now'
      },
      confirmationModal: {
        title: 'Confirm Offer',
        confirmButton: 'Confirm',
        editButton: 'Edit'
      },
      confirmedModal: {
        title: 'Offer successfully created',
        subtitle: 'Your offer was successfully created, now you can contact your counterparty',
        confirmButton: 'Confirm',
        copyLinkButton: 'Copy link'
      }
    }
  },
  user: {
    button: {
      makeOffer: {
        label: 'Make an offer'
      }
    },
    filters: {
      collection: {
        title: 'Collections'
      }
    }
  }
}
