#!/bin/bash

set -e

# purpose is to run npm version and push created tag
# args - first is major/minor/patch/pre...  second should be github access token


# basic validation of args
if [[ $# -lt 2 ]] ; then
    echo 'You must provide two arguments: version_type + github token'
    exit 1
fi
if [ "$1" == "major" ]
then
  echo "Will bump major"
elif [ "$1" == "minor" ]
then
  echo "Will bump minor"
elif [ "$1" == "patch" ]
then
  echo "Will bump patch"
elif [ "$1" == "premajor" ]
then
  echo "Will bump premajor"
elif [ "$1" == "preminor" ]
then
  echo "Will bump preminor"
elif [ "$1" == "prepatch" ]
then
  echo "Will bump prepatch"
else
  echo "version type must be major, minor, patch, premajor, preminor or prepatch "
  exit 1
fi

git remote add ci_origin "https://$2@github.com/miob-miob/treeGarden.git"

npm version "$1" -m "Publish tree-garden %s"

# push generated changes into package.json + package.lock.json
git push ci_origin

# extract new version from package.json
new_version=$(node scripts/logPackageVersion.js)

# push newly created tag
git push ci_origin v"${new_version}"
