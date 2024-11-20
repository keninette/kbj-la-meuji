'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { CustomControlledEditor } from '@/app/game-master/adventure/[adventureSlug]/chapter/[id]/components/CustomControlledEditor';
import { Session } from '@/model/sessions/Session.class';
import { SessionsApi } from '@/services/sessions.api';
import { CharacterThumbnail } from '@/app/game-master/adventure/[adventureSlug]/chapter/[id]/components/CharacterThumbnail';
import { Character } from '@/model/sessions/Character.class';

type SessionTabProps = {
  adventureSlug: string;
  storyArcSlug: string;
};
export function SessionTab({ adventureSlug, storyArcSlug }: SessionTabProps) {
  const [session, setSession] = useState<Session>();
  const [sessions, setSessions] = useState<Array<Session>>();
  const onSelectedSession = (slug: string) => {
    if (session) {
      confirm('Une session est déjà sélectionnée, êtes-vous sûr ?');
    }
    const selectedSession = sessions?.find((thisSession) => thisSession.slug === slug);
    setSession(selectedSession);
  };

  const saveSession = (thisSession: Session) => {
    setSession(thisSession);
    SessionsApi.updateSession({ adventureSlug, storyArcSlug, sessionSlug: thisSession.slug }, thisSession);
  };

  // todo slice to not change characters orders
  const saveCharacter = (thisCharacter: Character) => {
    const otherCharacters = session?.characters?.filter((character) => character.uuid !== thisCharacter.uuid);
    saveSession({ ...session, characters: [...otherCharacters, thisCharacter] } as Session);
  };

  useEffect(() => {
    (async () => {
      setSessions(await SessionsApi.getStoryArcSessions({ adventureSlug, storyArcSlug }));
    })();
  }, [adventureSlug, storyArcSlug]);

  // todo Fix session description override sometimes
  // todo npc
  return (
    <div className='flex flex-col h-full'>
      <select
        className='flex w-1/3 mb-2 bg-gray-200 text-black'
        onChange={(e: FormEvent) => onSelectedSession(e.target.value)}
      >
        <option>Aucune</option>
        {sessions?.map((thisSession: Session) => (
          <option key={thisSession.slug} value={thisSession.slug}>
            {thisSession.name}
          </option>
        ))}
      </select>
      {session && (
        <>
          <div>
            <ul className='flex flex-wrap'>
              {session?.characters.map((character) => (
                <li key={character.uuid}>
                  <CharacterThumbnail initialCharacter={character} isEditable={true} onUpdateCallback={saveCharacter} />
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-grow justify-center bg-white text-black'>
            <CustomControlledEditor session={session} onContentStateCallback={saveSession} />
          </div>
        </>
      )}
    </div>
  );
}
