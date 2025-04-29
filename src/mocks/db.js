import { factory, primaryKey } from '@mswjs/data';

export const db = factory({
  user: {
    id: primaryKey(Number),
    name: String,
    email: String,
  },
});

// Seed initial data
db.user.create({ id: 1, name: 'John Doe', email: 'john@example.com' });
db.user.create({ id: 2, name: 'Jane Smith', email: 'jane@example.com' });
db.user.create({ id: 3, name: 'Bob Johnson', email: 'bob@example.com' });