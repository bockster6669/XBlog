import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:3000/api/users/:id', () => {
    const user = {
      userName: 'bh',
      firstName: 'Boris',
      lastname: 'Foster',
      bio: 'Like movies',
    }
    return HttpResponse.json(user);
  }),
];
