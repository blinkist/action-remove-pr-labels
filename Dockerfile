FROM node:14-alpine

WORKDIR /lib

COPY . .

RUN npm install
RUN npm run build
RUN npm prune --production

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]