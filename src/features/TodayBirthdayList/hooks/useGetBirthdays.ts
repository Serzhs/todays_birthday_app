import { useEffect } from 'react';
import {
  BirthdayResponse,
  setBirthdays,
  setError,
  setLoading,
} from '../store/todayBirthdaySlice';
import { api } from '../../../api/api';
import { getTodayData } from '../utils/getTodayData';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

type UseGetBirthdaysProps = {
  onError: () => void;
};

export const useGetBirthdays = ({ onError }: UseGetBirthdaysProps) => {
  const { birthdays, dataIsFetching, dataFetchingError } = useAppSelector(
    ({ todayBirthday }) => {
      return todayBirthday;
    },
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const { day, month } = getTodayData();

    dispatch(setLoading(true));

    api
      .get<BirthdayResponse>(`/en/onthisday/births/${month}/${day}`)
      .then(({ data }) => {
        dispatch(setBirthdays(data));
      })
      .catch(() => {
        dispatch(setError(true));
        onError();
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);

  return {
    birthdays,
    dataIsFetching,
    dataFetchingError,
  };
};
