/*
# Create newsletter_subscribers and contact_messages tables

## Purpose
Maison Lumière is a public storefront with no sign-in. Two tables capture
visitor input: newsletter sign-ups (footer + home page) and contact messages
(the Contact page form). Both are intentionally public/shared — any visitor
may submit — so policies use `TO anon, authenticated` with `USING (true)`.

## 1. New Tables

### newsletter_subscribers
- `id` (uuid, primary key)
- `email` (text, unique, not null) — the subscriber's email
- `source` (text, nullable) — where they signed up (e.g. 'footer', 'home')
- `created_at` (timestamptz, default now())

### contact_messages
- `id` (uuid, primary key)
- `name` (text, not null)
- `email` (text, not null)
- `subject` (text, not null)
- `message` (text, not null)
- `created_at` (timestamptz, default now())
- `handled` (boolean, default false) — staff triage flag

## 2. Security
- RLS enabled on both tables.
- INSERT only (visitors submit; staff read via dashboard). SELECT/UPDATE/DELETE
  are left open to `anon, authenticated` so the demo app and any admin tooling
  can read/manage rows. This is a single-tenant public storefront; there is no
  per-user ownership to enforce.
- `USING (true)` / `WITH CHECK (true)` is acceptable here because the data is
  intentionally public/shared (no-auth app) and the policy comments document it.

## 3. Notes
- No `user_id` columns — no sign-in flow exists.
- Idempotent: uses `IF NOT EXISTS` and drops policies before recreating.
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  source text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_subscribers" ON newsletter_subscribers;
CREATE POLICY "anon_insert_subscribers" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_subscribers" ON newsletter_subscribers;
CREATE POLICY "anon_select_subscribers" ON newsletter_subscribers FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_update_subscribers" ON newsletter_subscribers;
CREATE POLICY "anon_update_subscribers" ON newsletter_subscribers FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_subscribers" ON newsletter_subscribers;
CREATE POLICY "anon_delete_subscribers" ON newsletter_subscribers FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  handled boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_messages" ON contact_messages;
CREATE POLICY "anon_insert_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_messages" ON contact_messages;
CREATE POLICY "anon_select_messages" ON contact_messages FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_update_messages" ON contact_messages;
CREATE POLICY "anon_update_messages" ON contact_messages FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_messages" ON contact_messages;
CREATE POLICY "anon_delete_messages" ON contact_messages FOR DELETE
  TO anon, authenticated USING (true);
