FROM node:8.11.3
ENV HOME=/home/app
WORKDIR $HOME

COPY . $HOME
RUN yarn

EXPOSE 3000
CMD [ "yarn", "start" ]
