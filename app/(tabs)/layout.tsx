import TabBar from '@/components/tab-bar/TabBar';
import { ReactElement } from 'react';

const TabLayout = ({ children }: { children: ReactElement }) => {
  return (
    <main className="h-full flex items-center justify-center">
      <div className="w-96 h-4/6 flex flex-col justify-between overflow-scroll relative">
        {children}
        <TabBar />
      </div>
    </main>
  );
};

export default TabLayout;
