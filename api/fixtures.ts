import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Photo from './models/Photo';

(async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('photos');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user_1, user_2] = await User.create(
    {
      username: 'Okabe Rintarou',
      password: 'el.psy.congroo',
      displayName: 'Himer Rokovoy',
      avatar: 'fixtures/okabe.png',
      token: crypto.randomUUID(),
    },
    {
      username: 'topmangaka',
      password: 'rohanmotorcycle',
      displayName: 'Kishibe Rohan',
      avatar: 'fixuter/rohan.jpg',
      token: crypto.randomUUID(),
    },
    {
      username: 'admin',
      password: 'admin',
      token: crypto.randomUUID(),
      role: 'admin',
    },
  );

  await Photo.create(
    {
      user: user_1._id,
      title: 'el psy congroo...',
      image: 'fixtures/elpsycongroo.jpg',
    },
    {
      user: user_2._id,
      title: 'Daga Kotowaru!',
      image: 'fixtures/dagakotowaru.jpg',
    },
  );

  await db.close();
})().catch(console.error);
