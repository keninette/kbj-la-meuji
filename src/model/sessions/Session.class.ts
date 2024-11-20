import { StoryArc } from '@/model/adventure/story-arc/StoryArc.class';
import { Character } from '@/model/sessions/Character.class';
import { v4 } from 'uuid';
import { NonPlayerCharacter } from '@/model/NonPlayerCharacter.class';
import { Adventure } from '@/model/Adventure.class';
import { SessionInterface } from '@/model/sessions/Session.interface';
import { ContentState } from 'react-draft-wysiwyg';

export class Session implements SessionInterface {
  uuid: string;
  slug: string;
  name: string;
  adventure: Adventure;
  storyArc: StoryArc;
  characters: Character[];
  nonPlayableCharacters: NonPlayerCharacter[];
  description?: ContentState;

  constructor(adventure: Adventure, storyArc: StoryArc) {
    this.uuid = v4();
    this.slug = '';
    this.name = '';
    this.adventure = adventure;
    this.storyArc = storyArc;
    this.characters = [];
    this.nonPlayableCharacters = [];
  }
}
