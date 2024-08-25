import TabBar from '@/components/tab-bar/TabBar';
import { ReactElement } from 'react';

const TabLayout = ({ children }: { children: ReactElement }) => {
  return (
    <main className="h-full flex items-center justify-center">
      <div className="w-96 h-4/6 p-5 overflow-scroll">
        {children}
        <TabBar />
      </div>
    </main>
  );
};

export default TabLayout;
