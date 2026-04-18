#!/usr/bin/env bash
set -euo pipefail

# DESTRUCTIVE: wipes all exam-related tables. Use before re-importing the
# sanitized CSV to start from a clean slate.
#
# Usage:
#   bash tools/reset-exam-data.sh          # prompts for confirmation
#   bash tools/reset-exam-data.sh --yes    # skip confirmation

DB_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5433/sneaker_db}"
SQL_FILE="$(cd "$(dirname "$0")" && pwd)/reset-exam-data.sql"

if [[ ! -f "$SQL_FILE" ]]; then
  echo "SQL file not found: $SQL_FILE" >&2
  exit 1
fi

echo "About to TRUNCATE exams, exam_variations, entries, examboards,"
echo "exam_labels, subjects, variation_types on:"
echo "  $DB_URL"
echo

if [[ "${1:-}" != "--yes" ]]; then
  read -r -p "Type 'wipe' to confirm: " ans
  if [[ "$ans" != "wipe" ]]; then
    echo "Aborted."
    exit 1
  fi
fi

psql "$DB_URL" -v ON_ERROR_STOP=1 -f "$SQL_FILE"

echo
echo "Done. All exam-related tables are empty — ready for a fresh import."
