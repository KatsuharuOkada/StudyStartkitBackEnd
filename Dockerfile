FROM node:13.0.1

# Create app directory

ENV HOME=/home/app
WORKDIR $HOME


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./

RUN yarn

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .


EXPOSE 3001

CMD [ "yarn", "start" ]
