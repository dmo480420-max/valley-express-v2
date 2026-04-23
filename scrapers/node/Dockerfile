FROM node:20-slim

WORKDIR /app

# Copy the entire platform to access lib/google-api.ts logic
COPY . .

RUN cd scrapers/node && npm install

CMD ["node", "scrapers/MASTER_LEDGER_INGEST.js"]
