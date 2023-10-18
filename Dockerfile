FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]

# #Dockerfile
# #추후에 COPY 부분 수정 해야됨 전부다 카피하는데
# FROM node:18

# WORKDIR /app

# # COPY src test package*.json tsconfig.json tsconfig.build.json /app/
# COPY . /app/
# RUN [ "npm", "install" ]


# EXPOSE 3000

# RUN [ "npm", "run", "build" ]

# CMD [ "npm", "run", "start" ]