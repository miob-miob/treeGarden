#!/bin/bash


set -eu
tree_garden_version=0.7.7
helm_cmd="upgrade --set image_version=$tree_garden_version --install -n tree-garden tree-garden-dox ./helm_charts/tree-garden-docs/"


docker run -it --rm\
  --volume $(pwd):/workdir\
  --workdir /workdir\
  --env KUBECONFIG='/workdir/kube.conf'\
  -u root\
  alpine/helm:3.10.2\
  list

