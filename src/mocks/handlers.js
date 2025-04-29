import { db } from './db';
import { http, HttpResponse } from 'msw';
import types from './data/types.json';
import animals from './data/animals.json';
import details from './data/details.json';

export const handlers = [
  // Get all users
  http.get('/api/users', () => {
    const users = db.user.getAll();
    return HttpResponse.json(users);
  }),

  // Create a new user
  http.post('/api/users', async ({ request }) => {
    const newUser = await request.json();
    const user = db.user.create(newUser);
    return HttpResponse.json(user);
  }),

  // Delete a user
  http.delete('/api/users/:id', ({ params }) => {
    const { id } = params;
    db.user.delete({ where: { id: { equals: Number(id) } } });
    return HttpResponse.json({ success: true });
  }),

  // Get animal types
  http.get('/types', () => {
    return HttpResponse.json(types);
  }),

  // Get animals with optional filtering
  http.get('/animals', ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const query = url.searchParams.get('query');
    let response = animals.animals;

    if (type) {
      response = response.filter(
        (animal) => animal.type.toLowerCase() === type.toLowerCase()
      );
    }
    if (query) {
      response = response.filter(
        (animal) =>
          animal.contact.address.state
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          animal.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    return HttpResponse.json(response);
  }),

  // Get animal details by ID
  http.get('/animals/:id', ({ params }) => {
    const { id } = params;
    const response = details[id];

    if (!response) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(response);
  })
];