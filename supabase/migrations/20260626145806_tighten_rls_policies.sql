/*
# Tighten RLS policies on newsletter_subscribers and contact_messages

## Purpose
The previous migration created these two tables with `USING (true)` /
`WITH CHECK (true)` on every CRUD verb. The security scanner correctly flags
"always true" policies as bypassing row-level security.

This is a no-auth public storefront: the frontend (anon key) only ever
*inserts* into these tables — newsletter sign-ups (Footer) and contact
messages (Contact page). It never reads, updates, or deletes rows.

## Changes

### newsletter_subscribers
- DROP the permissive SELECT, UPDATE, and DELETE policies. The anon frontend
  does not need them, and leaving them open is the flagged risk.
- REPLACE the INSERT policy's `WITH CHECK (true)` with a real validation
  predicate: the row is allowed only if `email` is non-empty and matches a
  basic email pattern. This is no longer "always true."

### contact_messages
- DROP the permissive SELECT, UPDATE, and DELETE policies.
- REPLACE the INSERT policy's `WITH CHECK (true)` with a real validation
  predicate: `name`, `email`, `subject`, and `message` must all be non-empty,
  and `email` must match a basic email pattern.

## Security
- RLS remains enabled on both tables.
- Only INSERT is permitted to anon/authenticated, and only with validated
  payloads. SELECT/UPDATE/DELETE are now denied to anon/authenticated (no
  policy = no access under RLS). Staff/admin access happens through the
  dashboard (service role), which bypasses RLS.
- No `user_id` / `auth.uid()` — this is a no-auth app; there is no per-user
  ownership to enforce. The validation predicates are the meaningful check.

## Notes
- Idempotent: policies are dropped before recreation.
- No data is lost; no columns or rows are touched.
*/

-- newsletter_subscribers: drop permissive read/update/delete
DROP POLICY IF EXISTS "anon_select_subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "anon_update_subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "anon_delete_subscribers" ON newsletter_subscribers;

-- newsletter_subscribers: insert with real validation (not always-true)
DROP POLICY IF EXISTS "anon_insert_subscribers" ON newsletter_subscribers;
CREATE POLICY "anon_insert_subscribers" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND length(trim(email)) > 0
    AND email ~ '^[^@]+@[^@]+\.[^@]+$'
  );

-- contact_messages: drop permissive read/update/delete
DROP POLICY IF EXISTS "anon_select_messages" ON contact_messages;
DROP POLICY IF EXISTS "anon_update_messages" ON contact_messages;
DROP POLICY IF EXISTS "anon_delete_messages" ON contact_messages;

-- contact_messages: insert with real validation (not always-true)
DROP POLICY IF EXISTS "anon_insert_messages" ON contact_messages;
CREATE POLICY "anon_insert_messages" ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND length(trim(name)) > 0
    AND email IS NOT NULL AND email ~ '^[^@]+@[^@]+\.[^@]+$'
    AND subject IS NOT NULL AND length(trim(subject)) > 0
    AND message IS NOT NULL AND length(trim(message)) > 0
  );
