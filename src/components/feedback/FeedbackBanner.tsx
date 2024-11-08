import { Dispatch, SetStateAction } from 'react';

export enum FeedbackTypeEnum {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
}

export type FeedbackBannerProps = {
  message: string;
  type: FeedbackTypeEnum;
  setFeedback: Dispatch<SetStateAction<FeedbackBannerProps | undefined>>;
};

export default function FeedbackBanner({ message, type, setFeedback }: FeedbackBannerProps) {
  return (
    <div className='absolute flex bottom-0 left-0 bg-[#1a1a1a] bg-opacity-50 h-8 w-full justify-between items-center px-6'>
      <p>
        {type === FeedbackTypeEnum.ERROR && <span className='mr-2'>❗</span>}
        {type === FeedbackTypeEnum.SUCCESS && <span className='mr-2'>✔</span>}
        {type === FeedbackTypeEnum.LOADING && <span className='mr-2'>💪</span>}
        {message}
      </p>
      <button onClick={() => setFeedback(undefined)}>✖</button>
    </div>
  );
}
