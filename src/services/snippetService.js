import { supabase } from '../lib/supabase';
import { nanoid } from 'nanoid';

export async function saveSnippet(data) {
  const slug = data.slug || nanoid(10);

  const { data: snippet, error } = await supabase
    .from('snippets')
    .insert({
      slug,
      title: data.title || 'Untitled Snippet',
      html: data.html,
      css: data.css,
      javascript: data.javascript,
      user_id: null,
    })
    .select()
    .maybeSingle();

  if (error) {
    return { snippet: null, error: error.message };
  }

  return { snippet, error: null };
}

export async function updateSnippet(slug, data) {
  const { data: snippet, error } = await supabase
    .from('snippets')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('slug', slug)
    .select()
    .maybeSingle();

  if (error) {
    return { snippet: null, error: error.message };
  }

  return { snippet, error: null };
}

export async function getSnippet(slug) {
  const { data: snippet, error } = await supabase
    .from('snippets')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    return { snippet: null, error: error.message };
  }

  if (snippet) {
    await supabase
      .from('snippets')
      .update({ views: snippet.views + 1 })
      .eq('slug', slug);
  }

  return { snippet, error: null };
}

export async function deleteSnippet(slug) {
  const { error } = await supabase
    .from('snippets')
    .delete()
    .eq('slug', slug);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function getAllSnippets() {
  try {
    console.log('[snippetService] fetching all snippets...');
    const res = await supabase
      .from('snippets')
      .select('id, slug, title, created_at, views')
      .order('created_at', { ascending: false });

    console.log('[snippetService] response:', res);
    if (res.error) return { snippets: null, error: res.error.message };
    return { snippets: res.data || [], error: null };
  } catch (err) {
    console.error('[snippetService] unexpected:', err);
    return { snippets: null, error: String(err) };
  }
}

