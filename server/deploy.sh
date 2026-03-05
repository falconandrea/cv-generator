#!/bin/bash
set -e

echo "🚀 Deploy CV Generator"

# Carica variabili ambiente (se le usi)
if [ -f .env ]; then
  echo "Loading environment variables from .env..."
  export $(grep -v '^#' .env | xargs)
fi

echo "📦 Pulling latest image..."
docker pull ghcr.io/falconandrea/craftcv.online:main

echo "🔁 Restarting containers..."
docker compose up -d --force-recreate

echo "✅ Deploy completed successfully!"
