import { screen, fireEvent } from '@testing-library/react';
import TodayBirthdays from './TodayBirthdays';

import {
  mockGetErrorResponse,
  mockGetResponse,
  renderWithProvider,
} from '@/test/utils.tsx';
import { getTodayData } from '@/features/TodayBirthdayList/utils/getTodayData.ts';

const generateBirthdayResponse = () => {
  return Array.from({ length: 22 }, (_, i) => i).map(() => {
    return {
      text: 'Caleb McLaughlin, American actor',
      year: 2001,
      pages: [
        {
          originalimage: {
            height: 1391,
            source:
              'https://upload.wikimedia.org/wikipedia/commons/f/fe/Cameron_Thomas_%2851874870188%29_%28cropped%29.jpg',
            width: 1085,
          },
        },
      ],
    };
  });
};

describe('<TodayBirthdays />', () => {
  it('should display 21 persons by default and 22 after pressing the "Load More" button', async () => {
    const { day, month } = getTodayData();
    mockGetResponse(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`,
      {
        births: generateBirthdayResponse(),
      },
    );

    renderWithProvider(<TodayBirthdays />);

    // wait until data loads
    await screen.findAllByText('Full Name:');

    expect(screen.queryAllByText('Full Name:')).toHaveLength(21);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Load more',
      }),
    );

    expect(screen.queryAllByText('Full Name:')).toHaveLength(22);
  });

  it('should display an error modal on API error and close it after clicking the close button', async () => {
    const { day, month } = getTodayData();
    mockGetErrorResponse(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`,
    );

    renderWithProvider(<TodayBirthdays />);

    // wait until data loads
    await screen.findAllByText('Error while fetching data');

    expect(
      screen.getByText(
        'Oops! We encountered an error while fetching your data. Please try again later. If you continue to experience issues, feel free to reach out to our support team for assistance.',
      ),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Close',
      }),
    );

    expect(
      screen.getByText(
        'Oops! We encountered an error while trying to fetch the data. Please try again later.',
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Error while fetching data'),
    ).not.toBeInTheDocument();
  });
});
