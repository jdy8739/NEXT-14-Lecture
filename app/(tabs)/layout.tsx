import TabBar from '@/components/tab-bar/TabBar';
import { ReactElement } from 'react';

const TabLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      {children}
      <TabBar />
    </>
  );
};

export default TabLayout;
