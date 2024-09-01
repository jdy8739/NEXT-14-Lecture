import TabBar from '@/components/tab-bar/TabBar';
import { ReactElement } from 'react';

const TabLayout = ({
  children,
  modal,
}: {
  children: ReactElement;
  modal: ReactElement;
}) => {
  return (
    <>
      {children}
      {modal}
      <TabBar />
    </>
  );
};

export default TabLayout;
