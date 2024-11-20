import { Adventure } from '@/model/Adventure.class';
import { StoryArc } from '@/model/adventure/story-arc/StoryArc.class';
import { Character } from '@/model/sessions/Character.class';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';

export interface SessionInterface {
  uuid: string;
  slug: string;
  name: string;
  adventure: Adventure;
  storyArc: StoryArc;
  characters: Character[];
  nonPlayableCharacters: NonPlayerCharacter[];
  description?: any;
}
