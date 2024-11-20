import React, { useEffect, useState } from 'react';
import { Character } from '@/model/sessions/Character.class';
import Image from 'next/image';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';

type CharacterProps = {
  initialCharacter: Character;
  isEditable: boolean;
  onUpdateCallback: (char: Character | NonPlayerCharacter) => void;
};

export function CharacterThumbnail({ initialCharacter, isEditable, onUpdateCallback }: CharacterProps) {
  const [character, setCharacter] = useState(initialCharacter);
  const characterPortrait = character.portrait ?? `default-${character.identifiesAs.toLowerCase()}.jpg`;

  // todo fix this (save with new values, use character instead ?)
  const onCharacterChange = (updatedCharacteristic: object) => {
    setCharacter((prevState) => {
      return { ...prevState, updatedCharacteristic };
    });
  };

  useEffect(() => {
    console.log('saving char');
    onUpdateCallback(character);
  }, [character]);

  // todo tooltip with all info
  // todo is there a way to use form validation on increment & decrement

  return (
    <div
      className={`bg-white bg-opacity-10 mr-2 mb-2 border-t-2 border-gray-500
      ${
        (character.currentHealthPoints < 5 || character.currentSanPoints < 0.66 * initialCharacter.maxSanPoints) &&
        ' border-t-orange-400'
      }
      ${
        (character.currentHealthPoints <= 0 || character.currentSanPoints < 0.33 * initialCharacter.maxSanPoints) &&
        'border-t-red-500'
      }`}
    >
      <p className='font-bold'>{initialCharacter.name}</p>
      <div className='flex w-[250px] h-[75px]'>
        <div className='flex h-full'>
          <Image
            src={`/assets/img/chars/${characterPortrait}`}
            alt={initialCharacter.name}
            width={110}
            height={110}
            className='object-contain'
          />
        </div>
        <div className='flex flex-col w-full ml-4'>
          <div className='flex w-full'>
            <p className='font-bold flex-grow w-6'>HP</p>
            <p className='flex'>
              {isEditable && (
                <button onClick={() => onCharacterChange({ currentHealthPoints: character.currentHealthPoints - 1 })}>
                  ➖
                </button>
              )}
              <p className='flex justify-center w-6'>{character.currentHealthPoints}</p>
              {isEditable && (
                <button onClick={() => onCharacterChange({ currentHealthPoints: character.currentHealthPoints + 1 })}>
                  ➕
                </button>
              )}
            </p>
            <p>/ {initialCharacter.maxHealthPoints}</p>
          </div>
          <div className='flex w-full'>
            <p className='font-bold flex-grow w-6'>SAN</p>
            <p className='flex'>
              {isEditable && (
                <button onClick={() => onCharacterChange({ currentSanPoints: character.currentSanPoints - 1 })}>
                  ➖
                </button>
              )}
              <p className='flex justify-center w-6'>{character.currentSanPoints}</p>
              {isEditable && (
                <button onClick={() => onCharacterChange({ currentSanPoints: character.currentSanPoints + 1 })}>
                  ➕
                </button>
              )}
            </p>
            <p>/ {initialCharacter.maxSanPoints}</p>
          </div>
          <div className='flex w-full'>
            <p className='font-bold flex-grow w-6'>MP</p>
            <p className='flex'>
              {isEditable && (
                <button onClick={() => onCharacterChange({ currentMagicPoints: character.currentMagicPoints - 1 })}>
                  ➖
                </button>
              )}
              <p className='flex justify-center w-6'>{character.currentMagicPoints}</p>
              {isEditable && (
                <button onClick={() => onCharacterChange({ currentMagicPoints: character.currentMagicPoints + 1 })}>
                  ➕
                </button>
              )}
            </p>
            <p>/ {initialCharacter.maxMagicPoints}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
