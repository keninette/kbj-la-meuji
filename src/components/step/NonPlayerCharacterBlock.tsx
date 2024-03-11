import { Tooltip } from 'react-tooltip';
import React from 'react';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';

type NonPlayerCharacterProps = {
  npc: NonPlayerCharacter;
  npcUniqId: string;
  displayPrivateInfo?: boolean;
};

export default function NonPlayerCharacterBlock({
  npc,
  npcUniqId,
  displayPrivateInfo = false,
}: NonPlayerCharacterProps) {
  return (
    <>
      <li className='flex flex-col my-4' key={npcUniqId} data-tooltip-id={`tooltip_${npcUniqId}`}>
        👩‍👦‍👦 {npc.name}
      </li>
      <Tooltip id={`tooltip_${npcUniqId}`} openOnClick={true} opacity={0.975}>
        <div className='flex border-solid border-2 border-gradient border-gradient--red--to-right p-4'>
          {npc.portrait && (
            <img className='w-48' src={`../../../assets/img/adventures/${npc.portrait.filename}`} alt='Portrait' />
          )}
          <div>
            <p className='bold'>{npc.name}</p>
            <p>{npc.age} ans</p>
            <p>{npc.occupation}</p>
            <p>{npc.publicDescription}</p>
            {displayPrivateInfo && npc.privateDescription && (
              <p className='mt-2 italic opacity-80'>{npc.privateDescription}</p>
            )}
          </div>
        </div>
      </Tooltip>
    </>
  );
}
