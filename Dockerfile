# Use *-alpine 
# Alpine Linux is much smaller than most distribution base images, 
# and thus leads to much slimmer images in general.
# For detail: https://github.com/nodejs/docker-node#nodealpine
FROM node:12.18.3-alpine as builder

# Create app directory

ENV HOME=/builder/app
WORKDIR ${HOME}
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

# You would install dependencies for packages that require node-gyp support on the alpine variant:
#  https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
RUN apk add --virtual .gyp python make g++ 
COPY package*.json  yarn.lock  ./
RUN yarn

RUN mkdir -p /prod_dep \
    && cp package.json yarn.lock /prod_dep/ \
    && cd /prod_dep \
    && yarn --prod \
    && cd ${HOME}

COPY . .

RUN yarn run build


#============================== BUILD IMAGE FOR PRODUCTION==========================
FROM node:12.18.3-alpine as production
RUN apk --no-cache add curl

ENV HOME=/home/app
WORKDIR ${HOME}
COPY package*.json ./
COPY yarn.lock .


COPY --from=builder /builder/app/dist/ ./dist/
COPY --from=builder /prod_dep/node_modules ./node_modules

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fails -s http://localhost:3000/.well-known/apollo/server-health || exit
EXPOSE $APP_PORT

