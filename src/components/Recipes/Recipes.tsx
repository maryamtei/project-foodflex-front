import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { X } from 'react-feather';
import { useDebounce } from 'react-use';
import RecipeCard from '../RecipeCard/RecipeCard';
import Schedule from '../Schedule/Schedule';
import SearchComponent from './SearchComponent/SearchComponent';

import { SelectedCategory } from '../../@types/recipe';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchRandomRecipes,
  fetchSearchRecipe,
} from '../../store/reducers/recipes';
import { displaySchedule } from '../../store/reducers/settings';
import CategoriesListBox from './Categories/CategoriesListBox';

function Recipes() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>();

  const dispatch = useAppDispatch();

  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);

  const recipes = useAppSelector((state) => state.recipes.list);

  // Utilisation du debounce pour limiter le nombre d'appel à l'api
  useDebounce(
    () => {
      if (search || selectedCategory) {
        dispatch(
          fetchSearchRecipe({ search, category: selectedCategory?.name })
        );
      } else {
        dispatch(fetchRandomRecipes({ count: 10 }));
      }
    },
    400,
    [dispatch, search, selectedCategory]
  );

  const closeModal = () => {
    dispatch(displaySchedule(false));
  };

  // affichage modale planning si on clique sur le '+'
  const showSchedule = useAppSelector(
    (state) => state.settings.clickAddSchedule
  );

  return (
    <div
      className={`my-10 px-3 sm:px-8 ${
        modalIsOpen ? 'sm:blur-[3px] sm:pointer-events-none' : ''
      }`}
    >
      {/* // affichage modale planning si on clique sur le '+' */}
      {/* {showSchedule && <Schedule />} */}

      <Transition appear show={showSchedule} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white p-6  align-middle shadow-xl transition-all">
                  <div className=" flex justify-end">
                    <X onClick={closeModal} />
                  </div>
                  <h2 className="text-2xl  font-bold text-gray-900">
                    Which day to eat this dish?
                  </h2>

                  <div className="mt-2">
                    <Schedule />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <h1 className="text-thirdff text-2xl sm:text-4xl font-bold md:mb-12 mb-6 text-center">
        Find exactly what you need !
      </h1>
      <div className="flex gap-2 relative">
        <SearchComponent
          name="RecipeSearch"
          value={search}
          onChange={setSearch}
        />
        <CategoriesListBox
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>
      {recipes.length === 0 && (
        <div className="text-center text-thirdff text-2xl font-bold  mt-10">
          No recipes found
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.idDbMeal} />
        ))}
      </div>
    </div>
  );
}

export default Recipes;
