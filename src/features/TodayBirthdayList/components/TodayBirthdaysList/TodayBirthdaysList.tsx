import { useMemo, useState } from 'react';
import style from './TodayBirthdaysList.module.scss';
import { useGetBirthdays } from '../../hooks/useGetBirthdays.ts';
import PersonCard from '../PersonCard/PersonCard.tsx';
import Modal from '../../../../components/Modal/Modal';
import Button from '../../../../components/Button/Button.tsx';
import PersonCardSkeleton from '../PersonCard/components/PersonCardSkeleton.tsx';
import Typography from '../../../../components/Typography/Typography';

const itemsPerPage = 21;

const personSkeletonsToLoad = Array.from(
  { length: itemsPerPage },
  (_, index) => index,
);

const TodayBirthdaysList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const { birthdays, dataIsFetching, dataFetchingError } = useGetBirthdays({
    onError: () => setErrorModalOpen(true),
  });

  const paginatedBirthdays = useMemo(() => {
    const endIndex = currentPage * itemsPerPage;

    return birthdays.slice(0, endIndex);
  }, [birthdays, currentPage]);

  const lastPage = useMemo(() => {
    const totalPages = Math.ceil(birthdays.length / itemsPerPage);

    return currentPage === totalPages;
  }, [birthdays, currentPage]);

  const showEmptyMessage =
    !dataIsFetching && !birthdays.length && !dataFetchingError;
  const showErrorMessage = !dataIsFetching && dataFetchingError;
  const shwLoadMore = !lastPage && !dataFetchingError;

  return (
    <div className={style.container}>
      <div className={style.listWrapper}>
        {dataIsFetching &&
          personSkeletonsToLoad.map(() => {
            return <PersonCardSkeleton key={Math.random()} />;
          })}

        {!dataIsFetching &&
          paginatedBirthdays.map(({ year, fullName, occupation, image }) => (
            <PersonCard
              key={`${fullName}${year}-${fullName}-${image}`}
              year={year}
              image={image}
              fullName={fullName}
              occupation={occupation}
            />
          ))}
      </div>
      {shwLoadMore && (
        <div className={style.loadMoreWrapper}>
          <Button
            label="Load more"
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </div>
      )}

      {showEmptyMessage && (
        <Typography variant="display-3" textAlign="center">
          Sadly, it seems no known individuals are celebrating their birthday
          today. Let's look forward to tomorrow! :(
        </Typography>
      )}

      {showErrorMessage && (
        <Typography variant="display-3" textAlign="center">
          Oops! We encountered an error while trying to fetch the data. Please
          try again later.
        </Typography>
      )}

      {errorModalOpen && (
        <Modal
          title="Error while fetching data"
          description="Oops! We encountered an error while fetching your data. Please try again later. If you continue to experience issues, feel free to reach out to our support team for assistance."
          onClose={() => setErrorModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TodayBirthdaysList;
