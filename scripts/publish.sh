#!/bin/bash

set -e

# some validation of args - first is major/minor/patch second should be github access token
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
else
  echo "version type must be major, minor or patch"
  exit 1
fi

# todo remove
git remote add ci_origin "https://miob-miob:$2@github.com/miob-miob/treeGarden"

npm version "$1" -m "Publish tree-garden %s"

# push generated changes into package.json + package.lock.json
git push ci_origin

# extract new version from package.json
new_version=$(node scripts/logPackageVersion.js)

# push newly created tag
git push ci_origin v"${new_version}"
