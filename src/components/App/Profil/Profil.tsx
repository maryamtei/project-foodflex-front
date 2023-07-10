import { Mail, User, Key } from 'react-feather';

function Profil() {
  return (
    <div className="container">
      <div className="mt-10 flex justify-center mb-16	">
        <button
          type="button"
          className="btn rounded-3xl text-black w-28 shadow-lg"
        >
          Favorites
        </button>
        <button
          type="button"
          className="ml-10 btn rounded-3xl text-black w-28 shadow-lg"
        >
          Profil
        </button>
      </div>

      <div className="flex bg-bgff border rounded-2xl mx-8 p-8">
        <ul>
          <li className="flex mb-8">
            <User className="mr-4" /> Name : (utilisateur)
          </li>
          <li className="flex mb-8">
            <Mail className="mr-4" />
            Mail : (mail utilisateur)
          </li>
          <li className="flex mb-8">
            <Key className="mr-4" />
            Password : ........
          </li>
        </ul>
      </div>
      <div className="flex flex-col mt-10 items-center">
        <button
          type="button"
          className="btn text-sm rounded-3xl text-black w-32 mb-5 shadow-lg"
        >
          edit profil
        </button>
        <button
          type="button"
          className="btn rounded-3xl text-black w-32 h-1 shadow-lg"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Profil;
