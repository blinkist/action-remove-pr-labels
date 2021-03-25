FROM node:14-alpine AS builder
WORKDIR /staging
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY src/ src/
RUN npm run build && npm prune --production

FROM node:14-alpine
COPY --from=builder staging/package.json .
COPY --from=builder staging/build lib/
COPY --from=builder staging/node_modules node_modules/
CMD ["node", "/lib/index.js"]