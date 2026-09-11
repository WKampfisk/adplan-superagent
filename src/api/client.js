import { createClient } from '@base44/sdk';

export const VAC_APP_ID = '6a7ac3508c7d7cde5928ecdf';
export const VAC_STUDIO = 'https://cryptic-ad-motion-lab.base44.app/studio';

export const base44 = createClient({
  appId: VAC_APP_ID,
  options: {
    onError: (error) => {
      if (error?.status === 401) return;
      console.error('Base44', error);
    },
  },
});

export function fnError(err) {
  const body = err?.response?.data;
  if (body?.error) return `${body.code ? `${body.code}: ` : ''}${body.error}`;
  return err?.message || 'Request failed';
}

export async function invoke(name, data) {
  const res = await base44.functions.invoke(name, data);
  return res.data;
}
