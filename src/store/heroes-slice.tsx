import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import hero from '../models/Hero';
import heroType from '../models/HeroType';

const BASE_URL = 'http://localhost:3000';

type heroState = {
  heroes: {
    data: hero[];
    totalCount: number;
  };
  hero: hero;
  heroTypes: heroType[];
  isLoading: boolean;
  isFailed: boolean;
};

const initialState: heroState = {
  heroes: {
    data: [],
    totalCount: 0,
  },
  hero: {
    id: '',
    avatar: '',
    full_name: '',
    type: '',
    description: '',
  },
  heroTypes: [],
  isLoading: false,
  isFailed: false,
};

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    loadingHeroes(state: heroState) {
      state.isLoading = true;
      state.isFailed = false;
    },
    fetchHeroes(
      state: heroState,
      action: PayloadAction<{ heroes: { data: hero[]; totalCount: number } }>,
    ) {
      state.heroes.data = action.payload.heroes.data;
      state.heroes.totalCount = action.payload.heroes.totalCount;
      state.isLoading = false;
      state.isFailed = false;
    },
    failedRequest(state: heroState) {
      state.isLoading = false;
      state.isFailed = true;
    },
  },
});

const heroActions = heroesSlice.actions;

export const fetchHeroes = () => {
  return async (dispatch: Dispatch) => {
    try {
      console.log('fetch');
      dispatch(heroActions.loadingHeroes());
      const API_URL = BASE_URL + '/heroes';
      const response = await fetch(API_URL);
      console.log(response);
      const responseData = await response.json();
      dispatch(heroActions.fetchHeroes({ heroes: responseData }));
    } catch (error) {
      console.log(error);
      dispatch(heroActions.failedRequest());
    }
  };
};

export default heroesSlice;
