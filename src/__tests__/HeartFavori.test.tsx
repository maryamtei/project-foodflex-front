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
    // Create a mock store with initial values
    const mockStore = configureMockStore();
    const initialState = {
      settings: {
        currentUser: {
          favorites: [], // You can define the user's favorites here
        },
        isLogged: true, // Set the value of isLogged for the test
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
    // Create a mock store with initial values
    const mockStore = configureMockStore();
    const initialState = {
      settings: {
        currentUser: {
          favorites: [],
        },
        isLogged: true,
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <HeartFavori recipe={recipe} />
      </Provider>
    );
    // Verify that the button is present
    const addFavoriButton = screen.getByRole('button');
    expect(addFavoriButton).toBeInTheDocument();

    // Verify if the heart icon is present
    const heartIcon = screen.getByTestId('heart-icon');
    expect(heartIcon).toBeInTheDocument();

    // Verify the value of the "fill" attribute
    const fillAttribute = heartIcon.getAttribute('fill');
    expect(fillAttribute).toEqual('none');
  });

  it('Recipe in favorites', async () => {
    // Create a mock store with initial values
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
          ],
        },
        isLogged: true,
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <HeartFavori recipe={recipe} />
      </Provider>
    );
    // Verify that the button is present
    const addFavoriButton = screen.getByRole('button');
    expect(addFavoriButton).toBeInTheDocument();

    // Verify if the heart icon is present
    const heartIcon = screen.getByTestId('heart-icon');
    expect(heartIcon).toBeInTheDocument();

    // Verify the value of the "fill" attribute = RED
    const fillAttribute = heartIcon.getAttribute('fill');
    expect(fillAttribute).toEqual('red');
  });
});
