import { Session } from '@/model/sessions/Session.class';

export const SessionsApi = {
  getStoryArcSessions: async (params: { adventureSlug: string; storyArcSlug: string }) => {
    const response = await fetch(`/api/sessions/${params.adventureSlug}/${params.storyArcSlug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      return [];
    }
    return ((await response.json()) as Session[]) ?? [];
  },
  updateSession: async (
    params: { adventureSlug: string; storyArcSlug: string; sessionSlug: string },
    session: Session,
  ) => {
    const response = await fetch(`/api/sessions/${params.adventureSlug}/${params.storyArcSlug}/${params.sessionSlug}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });

    if (![200, 201].includes(response.status)) {
      console.error(response);
      alert('error while saving session');
    } else {
      console.log('session saved successfully');
    }
  },
};
