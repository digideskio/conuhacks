#!/bin/bash

REGISTRY=docker.appdirectondemand.com
REGISTRY_USER=conuhacks
CONTAINER=frontend
VERSION="${BUILD_NUMBER:-latest}"
VERSION_TAG="${REGISTRY}/${REGISTRY_USER}/${CONTAINER}:${VERSION}"

function build {
    docker build --tag="${VERSION_TAG}" "${CONTAINER}"
}

function push {
    while [ -n "$(ps aux |grep -v grep |grep -E 'docker .*push')" ]
    do
        echo "Docker is pushing another image to the registry. Sleeping 5s"
        sleep 5
    done
	build $*
    docker push "${VERSION_TAG}"
}

case $1 in
    build)
        build $*
        ;;
    push)
        push $*
        ;;
    *)
        echo usage $(basename $0) build [container ...]
        echo usage $(basename $0) push [container ...]
esac

