import HomeView from './HomeView.vue';
import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { QueryClient } from '@tanstack/vue-query';

const client = new QueryClient();

describe('Testing HomeView', () => {
  it('should render HomeView Without any Problems', async () => {
    const user = userEvent.setup();
    server.use(
      http.get(/users\/1/, () => {
        return HttpResponse.json({
          id: 26,
          name: 'Marcus Hellams',
          username: 'mhellams',
          email: 'mhellams@hotmail.com',
          phone: '555-555-5555',
          website: 'http://mthdigital.com',
        });
      }),
    );
    render(HomeView, {
      global: {
        provide: {
          VUE_QUERY_CLIENT: client,
        },
      },
    });
    expect(screen.getByRole('heading', { name: /hello world/i })).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /fetch query/i });
    expect(button).toBeInTheDocument();
    expect(screen.queryByTestId('fetchedData')).not.toBeInTheDocument();
    await user.click(button);
    expect(await screen.findByTestId('fetchedData')).toBeInTheDocument();
    expect(screen.getByText(/"id": 26/)).toBeInTheDocument();
    expect(screen.getByText(/"name": "marcus hellams"/i)).toBeInTheDocument();
  });
});
