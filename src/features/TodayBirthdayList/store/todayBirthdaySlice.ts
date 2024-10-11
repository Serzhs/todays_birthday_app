import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Originalimage = {
  source: string;
  width: number;
  height: number;
};

type Birthday = {
  occupation: string;
  fullName: string;
  year: number;
  image: string;
};

export type BirthdayResponse = {
  births: {
    text: string;
    year: number;
    pages: { originalimage: Originalimage }[];
  }[];
};

export type TodayBirthdayState = {
  dataFetchingError: boolean;
  dataIsFetching: boolean;
  birthdays: Birthday[];
};

const initialState = {
  dataFetchingError: false,
  dataIsFetching: false,
  birthdays: [],
} satisfies TodayBirthdayState as TodayBirthdayState;

export const todayBirthdaySlice = createSlice({
  name: 'todayBirthday',
  initialState,
  reducers: {
    setBirthdays: (
      state: TodayBirthdayState,
      action: PayloadAction<BirthdayResponse>,
    ) => {
      state.birthdays = action.payload.births.map(({ text, year, pages }) => {
        // Assuming first available image will be good enough
        const firstImage = pages.find(({ originalimage }) => {
          return !!originalimage;
        });

        let image = '/assets/images/person_image_fallback.png';

        if (firstImage) {
          image = firstImage.originalimage.source;
        }

        const [fullName, occupation] = text.split(', ');

        return { fullName, occupation, year, image };
      });
    },
    setLoading: (state: TodayBirthdayState, action: PayloadAction<boolean>) => {
      state.dataIsFetching = action.payload;
    },
    setError: (state: TodayBirthdayState, action: PayloadAction<boolean>) => {
      state.dataFetchingError = action.payload;
    },
  },
});

export const { setLoading, setBirthdays, setError } =
  todayBirthdaySlice.actions;

export default todayBirthdaySlice.reducer;
