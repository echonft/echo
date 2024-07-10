#!/bin/sh

# Check if newt is installed, and install it if it's not
if ! command -v whiptail > /dev/null 2>&1; then
    echo "newt is not installed. Installing it using Homebrew..."
    if ! command -v brew > /dev/null 2>&1; then
        echo "Homebrew is not installed. Please install Homebrew first."
        exit 1
    fi
    brew install newt --quiet --force
    echo "newt installed successfully."
fi
