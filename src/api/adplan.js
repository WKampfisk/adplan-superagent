import { base44, invoke } from './client.js';

export const PLATFORMS = [
  { id: 'reels', label: 'Reels', ratio: '9:16' },
  { id: 'tiktok', label: 'TikTok', ratio: '9:16' },
  { id: 'shorts', label: 'Shorts', ratio: '9:16' },
  { id: 'stories', label: 'Stories', ratio: '9:16' },
  { id: 'feed', label: 'Feed', ratio: '1:1' },
];

export const GOALS = ['awareness', 'consideration', 'conversion', 'retention', 'ugc'];

export function probeHost() {
  const raw = localStorage.getItem('adplan.host') || '{}';
  let saved = {};
  try {
    saved = JSON.parse(raw);
  } catch {
    saved = {};
  }
  const mobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
  return {
    has_gpu: Boolean(saved.has_gpu),
    session_imagine: Boolean(saved.session_imagine),
    secrets_present: Array.isArray(saved.secrets_present) ? saved.secrets_present : [],
    probed_at: new Date().toISOString(),
    platform: mobile
      ? /Android/i.test(navigator.userAgent)
        ? 'android'
        : 'ios'
      : /Windows/i.test(navigator.userAgent)
        ? 'windows'
        : 'web',
  };
}

export function saveHost(partial) {
  const next = { ...probeHost(), ...partial, probed_at: new Date().toISOString() };
  localStorage.setItem('adplan.host', JSON.stringify(next));
  return next;
}

export async function generateProjectPlan(brief, host_profile, plan_id) {
  return invoke('generateProjectPlan', { brief, host_profile, plan_id });
}

export async function selectWorkflow(plan_id, recipe_id) {
  return invoke('selectWorkflow', { plan_id, recipe_id });
}

export async function exportWorkflowPrompt(plan_id, recipe_id) {
  return invoke('exportWorkflowPrompt', { plan_id, recipe_id });
}

export async function listPlans() {
  return base44.entities.ProjectPlan.list('-updated_date', 40);
}

export async function getPlan(id) {
  return base44.entities.ProjectPlan.get(id);
}

export function parseJson(value, fallback) {
  if (Array.isArray(value) || (value && typeof value === 'object')) return value;
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function dollars(n) {
  if (n == null) return '—';
  if (n === 0) return '$0';
  return `$${Number(n).toFixed(2)}`;
}

export function minutes(latency_s) {
  if (latency_s == null) return '—';
  const m = latency_s / 60;
  return m < 1 ? `${Math.round(latency_s)}s` : `~${m.toFixed(1)} min`;
}
