import { v4 } from 'uuid';

export class Character {
  uuid: string;
  name: string;
  profession: string;
  currentSanPoints: number;
  maxSanPoints: number;
  currentHealthPoints: number;
  maxHealthPoints: number;
  currentMagicPoints: number;
  maxMagicPoints: number;
  portrait: string;
  identifiesAs: 'Female' | 'Male' | 'Non-binary';

  constructor() {
    this.uuid = v4();
    this.name = 'Jeanine Jeaninesonn';
    this.profession = "Secrétaire d'acceuil";
    this.currentSanPoints = 0;
    this.maxSanPoints = 0;
    this.currentHealthPoints = 0;
    this.maxHealthPoints = 0;
    this.currentMagicPoints = 0;
    this.maxMagicPoints = 0;
    this.portrait = '';
    this.identifiesAs = 'Non-binary';
  }
}
