import { useEffect, useState } from 'react';

import HeaderMobile from './HeaderMobile/HeaderMobile';
import HeaderDesktop from './HeaderDesktop/HeaderDesktop';
import { useAppSelector } from '../../hooks/redux';

function Header() {
  const [headerMobile, setheaderMobile] = useState(false);

  const innerWidth = useAppSelector((state) => state.window.innerWidth);

  useEffect(() => {
    // Check if the innerWidth is greater than or equal to 640
    // and update the headerMobile state accordingly.
    if (innerWidth >= 640) {
      setheaderMobile(false);
    } else {
      setheaderMobile(true);
    }
  }, [innerWidth, setheaderMobile]);

  const renderheader = () => {
    // Render the appropriate header component based on the value of headerMobile state.
    if (headerMobile) {
      return <HeaderMobile />;
    }
    return <HeaderDesktop />;
  };
  // Call the renderheader function to render the appropriate header component.
  return renderheader();
}

export default Header;
