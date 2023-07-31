import React from 'react';
import configureMockStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import HeartFavori from '../components/RecipeCard/HeartFavori/HeartFavori';

const recipe = {
  idDbMeal: '1234',
  name: 'Chinon Apple Tarts',
  image: 'https://www.themealdb.com/images/media/meals/qtqwwu1511792650.jpg',
  id: 1,
  position: 0,
};

describe('HeartFavori', () => {
  it('Should render without crash', async () => {
    // Créez un store mock avec des valeurs de base
    const mockStore = configureMockStore();
    const initialState = {
      settings: {
        currentUser: {
          favorites: [], // Vous pouvez définir les favoris de l'utilisateur ici
        },
        isLogged: true, // Définissez la valeur de isLogged pour le test
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <HeartFavori recipe={recipe} />
      </Provider>
    );
  });

  it('Recipe not in favorites', async () => {
    // Créez un store mock avec des valeurs de base
    const mockStore = configureMockStore();
    const initialState = {
      settings: {
        currentUser: {
          favorites: [], // Vous pouvez définir les favoris de l'utilisateur ici
        },
        isLogged: true, // Définissez la valeur de isLogged pour le test
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <HeartFavori recipe={recipe} />
      </Provider>
    );
    // Vérifie que le bouton est présent
    const addFavoriButton = screen.getByRole('button');
    expect(addFavoriButton).toBeInTheDocument();

    // Vérifie si l'icône est présent
    const heartIcon = screen.getByTestId('heart-icon');
    expect(heartIcon).toBeInTheDocument();

    // Vérifie la valeur de l'attribut "fill"
    const fillAttribute = heartIcon.getAttribute('fill');
    expect(fillAttribute).toEqual('none');
  });

  it('Recipe in favorites', async () => {
    // Créez un store mock avec des valeurs de base
    const mockStore = configureMockStore();
    const initialState = {
      settings: {
        currentUser: {
          favorites: [
            {
              idDbMeal: '1234',
              name: 'Chinon Apple Tarts',
              image:
                'https://www.themealdb.com/images/media/meals/qtqwwu1511792650.jpg',
              id: 1,
              position: 0,
            },
          ], // Vous pouvez définir les favoris de l'utilisateur ici
        },
        isLogged: true, // Définissez la valeur de isLogged pour le test
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <HeartFavori recipe={recipe} />
      </Provider>
    );
    // Vérifie que le bouton est présent
    const addFavoriButton = screen.getByRole('button');
    expect(addFavoriButton).toBeInTheDocument();

    // Vérifie si l'icône est présent
    const heartIcon = screen.getByTestId('heart-icon');
    expect(heartIcon).toBeInTheDocument();

    // Vérifie la valeur de l'attribut "fill" = RED
    const fillAttribute = heartIcon.getAttribute('fill');
    expect(fillAttribute).toEqual('red');
  });
});
