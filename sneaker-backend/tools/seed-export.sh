#!/usr/bin/env bash
set -euo pipefail

DB_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5433/sneaker_db}"
OUT_FILE="${1:-tools/seed-data.sql}"

echo "Exporting exam_db seed data..."
echo "  DATABASE_URL=${DB_URL}"
echo "  OUT_FILE=${OUT_FILE}"

mkdir -p "$(dirname "$OUT_FILE")"

pg_dump "$DB_URL" \
  --data-only \
  --column-inserts \
  --on-conflict-do-nothing \
  --disable-triggers \
  --no-owner \
  --no-privileges \
  --exclude-table=public._prisma_migrations \
  --file "$OUT_FILE"

echo "Done. Wrote: $OUT_FILE"
