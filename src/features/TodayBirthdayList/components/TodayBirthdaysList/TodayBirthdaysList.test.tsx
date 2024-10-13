import { screen } from '@testing-library/react';
import TodayBirthdaysList from './TodayBirthdaysList';

import { mockGetResponse, renderWithProvider } from '@/test/utils.tsx';
import { getTodayData } from '../../utils/getTodayData.ts';

// TODO: Investigate how to manage multiple responses for the same request in MSW.
describe('<TodayBirthdaysList />', () => {
  it('should display an empty message when there are no birthdays to show', async () => {
    const { day, month } = getTodayData();
    mockGetResponse(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`,
      {
        births: [],
      },
    );

    renderWithProvider(<TodayBirthdaysList />);

    // wait until data loads
    await screen.findAllByText(
      "Sadly, it seems no known individuals are celebrating their birthday today. Let's look forward to tomorrow! :(",
    );
  });
});
