import { FC } from 'react';

export const FooterComponent: FC = () => (
  <footer className='flex items-center flex-col bg-slate-300 mt-3'>
    <small className='text-xs mb-2'>&copy;{new Date().getFullYear()} tminasen</small>
    <small className='text-xs mb-2'>This site uses Google Analytics.</small>
  </footer>
);
