/*
  # Code Snippets Storage Schema

  1. New Tables
    - `snippets`
      - `id` (uuid, primary key) - Unique identifier
      - `slug` (text, unique) - URL-friendly identifier for sharing
      - `title` (text) - Snippet title
      - `html` (text) - HTML code content
      - `css` (text) - CSS code content
      - `javascript` (text) - JavaScript code content
      - `user_id` (uuid, nullable) - Owner of the snippet (for future auth)
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
      - `views` (integer) - View count for analytics

  2. Security
    - Enable RLS on `snippets` table
    - Add policy for anyone to read snippets (public sharing)
    - Add policy for authenticated users to create snippets
    - Add policy for owners to update their snippets
    - Add policy for owners to delete their snippets

  3. Indexes
    - Index on `slug` for fast lookups
    - Index on `user_id` for user's snippets list
*/

CREATE TABLE IF NOT EXISTS snippets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text DEFAULT 'Untitled Snippet',
  html text DEFAULT '',
  css text DEFAULT '',
  javascript text DEFAULT '',
  user_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  views integer DEFAULT 0
);

ALTER TABLE snippets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read snippets"
  ON snippets
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create snippets"
  ON snippets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anonymous users can create snippets"
  ON snippets
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Users can update own snippets"
  ON snippets
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own snippets"
  ON snippets
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS snippets_slug_idx ON snippets(slug);
CREATE INDEX IF NOT EXISTS snippets_user_id_idx ON snippets(user_id);
