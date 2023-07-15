import { useEffect, useState } from 'react';

import HeaderMobile from './HeaderMobile/HeaderMobile';
import HeaderDesktop from './HeaderDesktop/HeaderDesktop';
import { useAppSelector } from '../../hooks/redux';

function Header() {
  const mobileView = useAppSelector((state) => state.window.mobileView);

  const renderheader = () => {
    // Render the appropriate header component based on the value of headerMobile state.
    if (mobileView) {
      return <HeaderMobile />;
    }
    return <HeaderDesktop />;
  };
  // Call the renderheader function to render the appropriate header component.
  return renderheader();
}

export default Header;
