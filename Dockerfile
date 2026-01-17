# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Enable Yarn Berry
RUN corepack enable

COPY package.json yarn.lock ./
COPY .yarn ./.yarn

# Install dependencies (frozen lockfile for reproducibility)
RUN yarn install --immutable

COPY . .

RUN yarn build

# Production Stage
FROM node:20-alpine AS runner

WORKDIR /app

# Enable Yarn Berry
RUN corepack enable

COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/dist ./dist

# Install only production dependencies
# Note: In PnP, we often need the full cache or specific install. 
# For simplicity in this PnP setup, we'll keep the install state from builder or re-install prod only if needed.
# Since .yarn/cache is copied, we can just run install to link.
RUN yarn workspaces focus --production

EXPOSE 3000

CMD ["yarn", "start:prod"]
