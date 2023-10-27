#!/usr/bin/bash


export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo '============================'
echo 'Running install_dependencies'
echo '============================'

REPOSITORY=/ubuntu/home/server

cd $REPOSITORY

sudo chmod -R 777 $REPOSITORY

npm install

docker-compose -f /ubuntu/home/server/docker-compose.prod.yaml up -d




