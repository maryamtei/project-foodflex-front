import { Twitter, Instagram, Facebook, GitHub, Youtube } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

function Footer() {
  const isLoged = useAppSelector((state) => state.settings.isLoged);

  return (
    <footer className="hidden sm:block bg-fourthff w-full px-7 py-6 z-10 h-60">
      <div className="text-bgff flex items-center h-full p-5 text-center gap-3 justify-between flex-row ">
        <div className="flex flex-col gap-3 ">
          <p className="text-md font-medium">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Blanditiis, fuga.
          </p>
          <div className="flex flex-col gap-3">
            <h2 className="text-md font-bold ">Folow Us On :</h2>
            <div className="flex gap-3 justify-center">
              <Facebook className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125" />
              <Twitter className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125" />
              <Youtube className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125" />
              <GitHub className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125" />
              <Instagram className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125" />
            </div>
            <p className="text-sm italic ">@2023 Foodflex</p>
          </div>
        </div>

        <div>
          <h2 className="text-md font-bold ">Quick Links :</h2>
          <ul className="flex flex-col gap-1 underline">
            <li>
              <NavLink to="/" relative="path">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${isLoged ? '/recipes' : '/signin'}`}
                relative="path"
              >
                Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${isLoged ? '/planning' : '/signin'}`}
                relative="path"
              >
                Planning
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${isLoged ? '/profil' : '/signin'}`}
                relative="path"
              >
                Profil
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${isLoged ? '/profil' : '/signin'}`}
                relative="path"
              >
                Sign-In
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" relative="path">
                Sign-Up
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-md font-bold ">Team :</h2>
          <ul className="flex flex-col gap-1 underline">
            <li>
              <NavLink to="/" relative="path">
                About us
              </NavLink>
            </li>
            <li>
              <NavLink to="/" relative="path">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-md font-bold ">Legal :</h2>
          <ul className="flex flex-col gap-1 underline">
            <li>
              <NavLink to="/" relative="path">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/" relative="path">
                Terms & Conditions
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
