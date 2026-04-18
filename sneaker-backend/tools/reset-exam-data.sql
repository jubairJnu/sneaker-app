-- tools/reset-exam-data.sql
--
-- DESTRUCTIVE: wipes every exam-related table so the bulk CSV importer can
-- start from a completely empty database. Intended for local test runs
-- before re-importing exam_variations_export_sanitized.csv.
--
-- What this wipes:
--   exams, exam_variations              (transactional exam rows)
--   entries, examboards, exam_labels    (lookup / dimension tables)
--   subjects, variation_types           (lookup / dimension tables)
--   _ExamLevelToSubject                 (implicit Prisma M2M join,
--                                        cleaned automatically via CASCADE)
--
-- What this PRESERVES:
--   terms_and_conditions                (unrelated to exam data)
--   _prisma_migrations                  (Prisma migration history)
--
-- Usage:
--   psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f tools/reset-exam-data.sql
--   # or via the wrapper:
--   bash tools/reset-exam-data.sh

BEGIN;

TRUNCATE TABLE
  "exam_variations",
  "exams",
  "entries",
  "examboards",
  "exam_labels",
  "subjects",
  "variation_types"
RESTART IDENTITY CASCADE;

COMMIT;

-- Verification — every row count below must be 0.
SELECT 'exams'           AS table_name, COUNT(*) AS row_count FROM "exams"
UNION ALL SELECT 'exam_variations', COUNT(*) FROM "exam_variations"
UNION ALL SELECT 'entries',         COUNT(*) FROM "entries"
UNION ALL SELECT 'examboards',      COUNT(*) FROM "examboards"
UNION ALL SELECT 'exam_labels',     COUNT(*) FROM "exam_labels"
UNION ALL SELECT 'subjects',        COUNT(*) FROM "subjects"
UNION ALL SELECT 'variation_types', COUNT(*) FROM "variation_types";
