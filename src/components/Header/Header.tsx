import { useEffect, useState } from 'react';

import HeaderMobile from './HeaderMobile/HeaderMobile';
import HeaderDesktop from './HeaderDesktop/HeaderDesktop';
import { useAppSelector } from '../../hooks/redux';

function Header() {
  const [headerMobile, setheaderMobile] = useState(false);

  const innerWidth = useAppSelector((state) => state.window.innerWidth);

  useEffect(() => {
    if (innerWidth >= 640) {
      setheaderMobile(false);
    } else {
      setheaderMobile(true);
    }
  }, [innerWidth, setheaderMobile]);

  const renderheader = () => {
    if (headerMobile) {
      return <HeaderMobile />;
    }
    return <HeaderDesktop />;
  };
  return renderheader();
}

export default Header;
