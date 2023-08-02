import { X, Menu } from 'react-feather';

interface MenuIconProps {
  menuActive: boolean;
}

function MenuIcon({ menuActive }: MenuIconProps) {
  return (
    <div className="relative h-9 w-9">
      <Menu
        className={`absolute h-9 w-9 transition-opacity duration-500 ${
          menuActive ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <X
        className={`absolute h-9 w-9 transition-opacity duration-500 ${
          menuActive ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

export default MenuIcon;
