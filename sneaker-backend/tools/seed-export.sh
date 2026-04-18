#!/usr/bin/env bash
set -euo pipefail

DB_URL="${DATABASE_URL:-postgresql://neondb_owner:npg_E0SsvDW7OBdL@ep-empty-smoke-ana3d0l4.c-6.us-east-1.aws.neon.tech/sneaker_db?sslmode=require&channel_binding=require}"
OUT_FILE="${1:-tools/seed-data.sql}"

echo "Exporting sneaker_db seed data..."
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
