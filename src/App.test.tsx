import { screen, fireEvent } from '@testing-library/react';
import App from './App';
import { getTodayData } from './features/TodayBirthdayList/utils/getTodayData.ts';
import { mockGetResponse, renderWithProvider } from '@/test/utils.tsx';

describe('<App />', () => {
  it('should navigate from home page to birthday list page and display one person', async () => {
    const { day, month } = getTodayData();
    mockGetResponse(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`,
      {
        births: [
          {
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
          },
        ],
      },
    );

    renderWithProvider(<App />);

    expect(
      screen.getByText(
        'Welcome, traveler! This webpage is dedicated to showcasing the famous individuals born today, based on Wikipedia. Enjoy exploring!',
        {},
      ),
    ).toBeInTheDocument();

    const buttonElement = screen.getByRole('button', {
      name: 'Click here to discover who is celebrating their birthday today!',
    });

    fireEvent.click(buttonElement);

    // wait until data loads
    const personAvatar =
      await screen.findByAltText<HTMLImageElement>('Caleb McLaughlin');

    expect(personAvatar.src).toBe(
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/Cameron_Thomas_%2851874870188%29_%28cropped%29.jpg',
    );
    expect(screen.getByText('Full Name:')).toBeInTheDocument();
    expect(screen.getByText('Caleb McLaughlin')).toBeInTheDocument();
    expect(screen.getByText('Occupation:')).toBeInTheDocument();
    expect(screen.getByText('American actor')).toBeInTheDocument();
    expect(screen.getByText('Birth year')).toBeInTheDocument();
    expect(screen.getByText('2001')).toBeInTheDocument();

    expect(screen.queryAllByText('Caleb McLaughlin').length).toEqual(1);
  });
});
