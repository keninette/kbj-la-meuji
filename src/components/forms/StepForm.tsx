import { FormEvent, useEffect, useState } from 'react';
import { Step } from '@/model/Step.class';

type StepFormProps = {
  requestedStep?: Step;
  nextStepId: string;
  onSubmitCallback: (updatedStep: Step) => void;
};
export default function StepForm({ requestedStep, nextStepId, onSubmitCallback }: StepFormProps) {
  const [step, setStep] = useState<Step>(Step.getEmptyStep());
  const onChange = (fieldName: string, value: string | number | string[]) => {
    const updatedStep: Step = { ...step };
    // todo remove tsignore
    // @ts-ignore
    updatedStep[fieldName] = value;
    setStep(updatedStep);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onSubmitCallback(step);
  };

  useEffect(() => {
    if (requestedStep) {
      setStep(requestedStep);
    }
  }, [requestedStep]);

  return (
    <>
      <h3 className='my-4'>Ajouter un step ({nextStepId})</h3>
      <div className='flex w-full mt-8'>
        <form className='flex flex-col w-full' onSubmit={onSubmit}>
          <div className='flex flex-col w-full'>
            <label htmlFor='name' className='text-white'>
              Description
            </label>
            <textarea
              name='description'
              placeholder='Description'
              value={step.description}
              onChange={(e) => onChange('description', e.target.value)}
              className='flex text-black w-full h-24 w-full'
              required
            />
          </div>
          <div className='flex flex-col w-full'>
            <label htmlFor='level' className='text-white'>
              Level
            </label>
            <input
              type='number'
              name='level'
              placeholder='Level'
              value={step.level}
              min={1}
              onChange={(e) => onChange('level', e.target.valueAsNumber)}
              className='flex text-black'
            />
          </div>
          <div className='flex flex-col w-full'>
            <label htmlFor='name' className='text-white'>
              Description
            </label>
            <input
              type='text'
              name='nextStepsIds'
              placeholder='nextStepsIds'
              value={step.nextStepsIds?.length ? step.nextStepsIds[0] : ''}
              onChange={(e) => onChange('nextStepsIds', [e.target.value])}
              className='flex text-black w-full'
              required
            />
          </div>
          <button type='submit'>Enregistrer</button>
        </form>
      </div>
    </>
  );
}
