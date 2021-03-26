FROM node:14-alpine
WORKDIR /lib
COPY . .
RUN npm install
RUN npm run build
RUN npm prune --production
CMD ["node", "/lib/build/index.js"]