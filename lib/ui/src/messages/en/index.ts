export const messages = {
  auth: {
    step0: {
      continueBtn: 'Continue',
      loginBtn: 'Link Discord',
      subtitle: 'Start by linking your Discord profile to Echo!',
      title: 'Link your Discord'
    },
    step1: {
      continueBtn: 'Skip',
      joinBtn: 'Join our Discord Now!',
      subtitle:
        'If you have come this far it is because you want to be part of the future of NFT swapping, get ready to live the Echo experience and transform the Web3 space with us!',
      title: 'Hey there {username}!'
    },
    step2: {
      continueBtn: {
        connected: 'Continue',
        disconnected: 'Skip'
      },
      subtitle: 'Connect your wallet to start swapping',
      title: 'Connect your wallet'
    }
  },
  collection: {
    button: {
      createListing: 'Create listing',
      createOffer: 'Make an offer'
    },
    details: {
      supply: '{supply, number, ::K} NFTs'
    },
    empty: {
      items: {
        message: 'There is no NFT for this collection'
      },
      listings: {
        btn: 'Create listing',
        message: 'There is currently no active listing for this collection'
      },
      swaps: {
        btn: 'Create listing',
        message: 'No swaps have been done for this collection yet'
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
    list: {
      header: {
        collection: 'Collection',
        rank: 'Rank',
        swapsCount: '# Swaps'
      }
    },
    page: {
      title: 'Collections Stats'
    },
    navigation: {
      items: 'Items',
      listings: 'Listings',
      swaps: 'Swaps'
    },
    search: {
      emptyResults: 'No collections found',
      label: 'Search by collection name'
    },
    thumbnail: {
      supply: '{supply, number, ::K} NFTs'
    },
    tile: {
      swapsCount: '{count, plural, =0 {No Swap} =1 {1 Swap} other {{count} Swaps}}'
    }
  },
  error: {
    listing: {
      cancel: 'An error occurred while trying to cancel the listing. Please try again',
      fill: 'An error occurred while trying to fill the listing. Please try again',
      new: 'An error occurred while trying to create the listing. Please try again'
    },
    offer: {
      accept: 'An error occurred while trying to accept the offer. Please try again',
      cancel: 'An error occurred while trying to cancel the offer. Please try again',
      new: 'An error occurred while trying to create the offer. Please try again',
      reject: 'An error occurred while trying to reject the offer. Please try again',
      swap: 'An error occurred while trying to swap the assets. Please try again'
    },
    profile: {
      addWallet: 'An error occurred while trying to add the wallet to your account. Please try again',
      signing: 'An error occurred while trying to sign the message. Please try again'
    }
  },
  errorPage: {
    homeBtn: 'Take me home',
    resetBtn: 'Try again',
    title: 'Something went wrong'
  },
  home: {
    discord: {
      btn: 'Join our discord',
      title: 'Join our community and start\\nswapping now'
    },
    rankedCollections: {
      btn: 'Explore all'
    },
    recentSwaps: {
      title: 'Recent swaps'
    },
    subtitle: 'Revolutionizing NFT Swapping and Communication!',
    title: 'OTC trade your NFTs\\nin the safest way',
    topCollections: {
      title: 'Top collections'
    }
  },
  layout: {
    header: {
      button: {
        disconnect: 'Logout',
        disconnecting: 'Logging out...',
        profile: 'Profile'
      }
    }
  },
  listing: {
    create: {
      assets: {
        in: 'Looking for',
        out: 'Offering'
      },
      backBtn: 'Back to Selection',
      banner: {
        btn: 'Review listing',
        title: 'Select your NFTs to finalize your listing'
      },
      clearBtn: {
        label: 'Clear',
        message: 'Hold to clear'
      },
      confirmBtn: 'Confirm',
      confirmedModal: {
        closeBtn: 'Close',
        subtitle: 'Your listing was successfully created',
        title: 'Listing successfully created',
        viewBtn: 'View'
      },
      continueBtn: 'Continue',
      discardModal: {
        cancelBtn: 'Cancel',
        discardBtn: 'Discard',
        discardBtnMessage: 'Hold to discard',
        subtitle: 'If you leave this page, your listing will be discarded',
        title: 'Discard Listing'
      },
      empty: {
        targets: 'To add a collection, type its name in the input above'
      }
    },
    details: {
      banner: {
        title: 'Select your NFTs to fill the listing'
      },
      cancelBtn: {
        label: 'Cancel',
        message: 'Hold to cancel'
      },
      expiredAt: 'Expired',
      expiresAt: 'Expires in',
      fillBtn: 'Fill Listing',
      offers: {
        empty: 'There are currently no offers on the listing',
        title: 'Current offers'
      },
      target: {
        quantity: 'x{count}'
      }
    },
    state: {
      CANCELLED: 'Cancelled',
      EXPIRED: 'Expired',
      FULFILLED: 'Fulfilled',
      OFFERS_PENDING: 'Offers pending',
      OPEN: 'Awaiting offers',
      PARTIALLY_FULFILLED: 'Partially fulfilled'
    }
  },
  nft: {
    action: {
      listing: 'Create Listing',
      offer: 'Make Offer'
    }
  },
  notFoundPage: {
    homeBtn: 'Take me home',
    subtitle: 'nothing here',
    title: 'Sorry, there’s'
  },
  offer: {
    create: {
      backBtn: 'Back to Selection',
      banner: {
        btn: 'Review offer',
        title: 'Select your NFTs to finalize your offer'
      },
      clearBtn: 'Clear',
      clearBtnMessage: 'Hold to clear',
      confirmedModal: {
        closeBtn: 'Close',
        subtitle: 'Your offer was successfully created, you can now contact your counterparty',
        title: 'Offer successfully created',
        viewBtn: 'View'
      },
      continueBtn: 'Continue',
      discardModal: {
        cancelBtn: 'Cancel',
        discardBtn: 'Discard',
        discardBtnMessage: 'Hold to discard',
        subtitle: 'If you leave this page, your offer will be discarded',
        title: 'Discard Offer'
      }
    },
    details: {
      acceptBtn: 'Accept',
      acceptModal: {
        approval: {
          subtitle: 'To accept the offer, you first need to approve the Echo contract to transfer your NFTs'
        },
        sign: {
          btn: 'Accept',
          subtitle: 'Great! Now you just need to sign a message so the counterparty can perform the swap'
        },
        title: 'Accept Offer'
      },
      approveModal: {
        btn: 'Approve'
      },
      cancelBtn: {
        label: 'Cancel',
        message: 'Hold to cancel'
      },
      completeBtn: 'Swap',
      expiredAt: 'Expired',
      expiresAt: 'Expires in',
      rejectBtn: {
        label: 'Reject',
        message: 'Hold to reject'
      },
      swapModal: {
        approval: {
          subtitle: 'To execute the swap, you first need to approve the Echo contract to transfer your NFTs'
        },
        execute: {
          btn: 'Swap',
          subtitle: 'Great! Now you just need to execute the trade'
        },
        title: 'Execute Swap'
      }
    },
    state: {
      ACCEPTED: 'Accepted',
      CANCELLED: 'Cancelled',
      COMPLETED: 'Swapped',
      EXPIRED: 'Expired',
      OPEN: 'Pending',
      REJECTED: 'Rejected'
    }
  },
  profile: {
    empty: {
      explore: {
        btn: 'Create listing',
        message: 'There is currently no pending listing for you'
      },
      items: {
        message: 'You do not own any NFT available on Echo'
      },
      listings: {
        btn: 'Create listing',
        message: 'You have not created any listing yet'
      },
      offers: {
        btn: 'Create listing',
        message: 'You have not made any offer yet'
      },
      pendingOffers: {
        btn: 'Create listing',
        message: 'You currently do not have any pending offer'
      }
    },
    listingButton: {
      create: 'Create listing',
      finalize: 'Finalize listing'
    },
    navigation: {
      explore: 'Explore',
      items: 'Owned',
      listings: 'Listings',
      offers: 'Offers',
      pendingOffers: 'Pending Offers'
    },
    offerButton: 'Finalize offer'
  },
  user: {
    button: 'Make an offer',
    empty: {
      items: {
        message: 'This user does not own any NFT'
      },
      listings: {
        btn: 'Make an offer',
        message: 'This user does not have any active listing'
      },
      swaps: {
        btn: 'Make an offer',
        message: 'This user has not made any swap'
      }
    },
    filters: {
      collection: {
        title: 'Collections'
      }
    },
    navigation: {
      items: 'Items',
      listings: 'Listings',
      swaps: 'Swaps'
    }
  },
  wallet: {
    button: {
      copied: 'Copied!',
      label: 'Connect'
    }
  }
}
