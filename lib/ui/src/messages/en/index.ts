export const messages = {
  assets: {
    in: 'Going in',
    out: 'Going out'
  },
  collection: {
    button: {
      create: 'Make an offer',
      edit: 'Edit offer'
    },
    details: {
      size: '{size, number, ::K} NFTs'
    },
    empty: {
      listings: {
        message: 'There is currently no active listing for this collection',
        btn: {
          label: 'Create listing'
        }
      },
      swaps: {
        message: 'No swap has been done for this collection yet',
        btn: {
          label: 'Create listing'
        }
      }
    },
    filters: {
      traits: {
        button: {
          title: '{trait}{count, plural, =0 {} other { (# selected)}}'
        },
        title: 'Attributes'
      }
    },
    thumbnail: {
      title: '{count} {collectionName}'
    },
    tile: {
      swapsCount: '{count, plural, =0 {No Swap} =1 {1 Swap} other {{count} Swaps}}'
    }
  },
  errorPage: {
    title: 'Something went wrong',
    button: {
      label: 'Go home'
    }
  },
  home: {
    title: 'OTC trade your NFTs\nin the safest way',
    subtitle: 'Revolutionizing NFT Swapping and Communication!',
    discord: {
      title: 'Join our community and start\nswapping now',
      btn: 'Join our discord'
    },
    recentSwaps: {
      title: 'Recent swaps'
    },
    rankedCollections: {
      btn: 'Explore all',
      collection: 'Collection',
      rank: 'Rank',
      swapsCount: '# Swaps'
    },
    topCollections: {
      title: 'Top collections'
    }
  },
  items: {
    new: {
      assetsInTitle: 'Going in',
      assetsOutTitle: 'Going out',
      addMoreBtn: 'Add more',
      noItemsTitle: 'No NFTs selected yet',
      noItemsBtn: 'Select NFTs now'
    }
  },
  layout: {
    header: {
      button: {
        connect: {
          label: 'Connect'
        },
        connecting: {
          label: 'Connecting...'
        },
        disconnect: {
          label: 'Disconnect'
        },
        profile: {
          label: 'Profile'
        }
      },
      searchInput: 'Search for a collection or a user'
    }
  },
  listing: {
    assets: {
      in: 'Looking for',
      out: 'Offering'
    },
    details: {
      assets: {
        title: {
          in: 'Interested in',
          out: 'Offering'
        }
      },
      cancelBtn: 'Cancel',
      expiresAt: 'Expires in',
      expiredAt: 'Expired'
    },
    new: {
      bottomSlider: {
        title: 'Listing overview',
        searchPlaceholder: 'Search by collection name',
        addCollectionBtn: 'Collection',
        itemsCount: '{count} {count, plural, =0 {} =1 {item} other {items}}',
        finalizeBtn: 'Finalize',
        dismissBtn: 'Dismiss',
        expirationTitle: 'Expires in',
        expirationValue: '7 days',
        emptySearch: 'No collections found',
        emptyTargets: 'To add a collection, type its name\nin the input above'
      },
      confirmationModal: {
        title: 'Confirm Listing',
        targetSubtitle: 'Target collection',
        itemsSubtitle: 'Your {count, plural, =0 {} =1 {asset} other {assets}}',
        confirmBtn: 'Confirm',
        editBtn: 'Edit'
      },
      confirmedModal: {
        title: 'Listing successfully created',
        subtitle: 'Your listing was successfully created',
        closeBtn: 'Close',
        copyLinkBtn: 'Copy link',
        linkCopied: 'Link copied!'
      }
    },
    state: {
      OPEN: 'Awaiting offers',
      OFFERS_PENDING: 'Offers pending',
      PARTIALLY_FULFILLED: 'Partially fulfilled',
      FULFILLED: 'Fulfilled',
      CANCELLED: 'Cancelled'
    }
  },
  navigation: {
    items: 'Items',
    listings: 'Listings',
    swaps: 'Swaps'
  },
  nft: {
    details: {
      attributes: {
        title: 'Attributes'
      },
      makeOfferBtn: 'Make an offer',
      listings: {
        title: 'Latest listings',
        empty: 'No listings posted yet',
        by: 'By',
        expiresIn: 'Expires in {time}'
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
  notFoundPage: {
    title: 'Sorry, there’s',
    subtitle: 'nothing here',
    button: {
      label: 'Go home'
    }
  },
  offer: {
    details: {
      assets: {
        in: 'Getting in your wallet',
        out: 'Leaving your wallet'
      },
      expiresAt: 'Expires in',
      expiredAt: 'Expired',
      acceptBtn: 'Accept',
      cancelBtn: 'Cancel',
      rejectBtn: 'Reject',
      approveBtn: 'Approve {count, plural, =0 {} =1 {NFT} other {NFTs}}',
      completeBtn: 'Execute Swap',
      actionModal: {
        closeBtn: 'Close',
        ACCEPT: {
          title: 'Offer accepted',
          subtitle: 'You have successfully accepted the offer',
          confirmBtn: 'Confirm',
          copyLinkBtn: 'Copy Link'
        },
        CANCEL: {
          title: 'Offer cancelled',
          subtitle: 'You have successfully cancelled the offer',
          dismissBtn: 'Dismiss'
        },
        REJECT: {
          title: 'Offer rejected',
          subtitle: 'You have successfully rejected the offer',
          dismissBtn: 'Dismiss'
        }
      },
      acceptModal: {
        title: 'Accept offer',
        subtitle:
          'To accept the offer, you need to approve the Echo contract to transfer your tokens (paid transactions) and then sign a message for the counterparty to perform the swap (not a transaction).',
        ownerAssets: 'You own all the assets',
        counterpartyAssets: 'Counterparty owns all the assets',
        approval: '{collectionName} is approved by Echo',
        signature: 'Signature is set'
      }
    },
    expired: 'Expired',
    new: {
      bottomSlider: {
        title: 'Offer overview',
        finalize: 'Finalize offer',
        noNftsTitle: 'No NFTs selected yet',
        noNftsBtn: 'Select NFTs now',
        dismissBtn: 'Dismiss'
      },
      confirmationModal: {
        title: 'Confirm Offer',
        assetsInSubtitle: 'Your {count, plural, =0 {} =1 {asset} other {assets}}',
        assetsOutSubtitle: "Counterparty's {count, plural, =0 {} =1 {asset} other {assets}}",
        confirmBtn: 'Confirm',
        editBtn: 'Edit'
      },
      confirmedModal: {
        title: 'Offer successfully created',
        subtitle: 'Your offer was successfully created, you can now contact your counterparty',
        closeBtn: 'Close',
        copyLinkBtn: 'Copy link',
        linkCopied: 'Link copied!'
      }
    },
    state: {
      OPEN: 'Pending',
      ACCEPTED: 'Accepted',
      CANCELLED: 'Cancelled',
      COMPLETED: 'Swapped',
      REJECTED: 'Rejected'
    }
  },
  profile: {
    button: {
      label: 'Create listing'
    },
    empty: {
      items: {
        message: 'You do not own any NFT'
      },
      listingsReceived: {
        message: 'There is currently no pending listing for you',
        btn: {
          label: 'Create listing'
        }
      },
      listingsCreated: {
        message: 'You have not created any listing yet',
        btn: {
          label: 'Create listing'
        }
      },
      offersReceived: {
        message: 'You currently do not have any pending offer',
        btn: {
          label: 'Create listing'
        }
      },
      offersCreated: {
        message: 'You have not made any offer yet',
        btn: {
          label: 'Create listing'
        }
      },
      swaps: {
        message: 'You have not done any swap yet',
        btn: {
          label: 'Create listing'
        }
      }
    },
    navigation: {
      items: 'My Items',
      listingsCreated: 'My Listings',
      listingsReceived: 'Pending Listings',
      offersCreated: 'My Offers',
      offersReceived: 'Pending Offers',
      swaps: 'My Swaps'
    },
    wallet: {
      button: {
        connect: {
          label: 'Connect Wallet'
        },
        connecting: {
          label: 'Connecting'
        },
        signing: {
          label: 'Signing'
        },
        add: {
          label: 'Add Wallet'
        }
      }
    }
  },
  user: {
    button: {
      label: 'Make an offer'
    },
    empty: {
      items: {
        message: 'This user does not own any NFT'
      },
      listings: {
        message: 'This user does not have any active listing',
        btn: {
          label: 'Make an offer'
        }
      },
      swaps: {
        message: 'This user has not made any swap',
        btn: {
          label: 'Make an offer'
        }
      }
    },
    filters: {
      collection: {
        title: 'Collections'
      }
    }
  }
}
