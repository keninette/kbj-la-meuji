import { Step } from '@/model/Step.class';
import { StoryArc } from '@/model/StoryArc.class';
import { Light } from '@/model/Light.class';

export class Chapter {
  constructor(id: string, name: string, steps: Step[]) {
    this.id = id;
    this.name = name;
    this.steps = steps;
  }

  id: string;
  name: string;
  storyArc?: StoryArc;
  nextChapterId?: string;
  description?: string;
  clues?: string[];
  sounds?: string[];
  lights?: Light[];
  steps: Step[];
}
