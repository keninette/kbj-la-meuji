import { Image } from '@/model/Image.class';

export class NonPlayerCharacter {
  id: number;
  name: string;
  portrait: Image;
  age: number;
  occupation: string;
  publicDescription: string;
  privateDescription: string;
  isStepBound: boolean;
  maxHealthPoints: number;
  currentHealthPoints: number;

  constructor() {
    this.id = new Date().getTime();
    this.name = '';
    // todo fix image constructor
    this.portrait = new Image('Portrait', '');
    this.age = 0;
    this.occupation = '';
    this.publicDescription = '';
    this.privateDescription = '';
    this.isStepBound = true;
    this.maxHealthPoints = 0;
    this.currentHealthPoints = this.maxHealthPoints;
  }
}
