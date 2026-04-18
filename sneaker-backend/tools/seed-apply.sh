#!/usr/bin/env bash
set -euo pipefail

DB_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5433/sneaker_db}"
SEED_FILE="${1:-tools/seed-data.sql}"

if [[ ! -f "$SEED_FILE" ]]; then
  echo "Seed file not found: $SEED_FILE" >&2
  echo "Run: npm run seed:export" >&2
  exit 1
fi

echo "Applying exam_db seed data..."
echo "  DATABASE_URL=${DB_URL}"
echo "  SEED_FILE=${SEED_FILE}"

psql "$DB_URL" -v ON_ERROR_STOP=1 -f "$SEED_FILE"

echo "Done. Seed applied."
