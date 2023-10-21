import express from 'express';
import Photo from '../models/Photo';
import { IPhoto } from '../types';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import { HydratedDocument } from 'mongoose';
import User from '../models/User';

const photosRouter = express.Router();

photosRouter.get('/', async (req, res) => {
  try {
    const queryUser = req.query.user;

    if (queryUser) {
      const user = await User.findById(queryUser);

      if (!user) {
        return res.status(400).send({ error: 'This user does not exist!' });
      }

      const photos = (await Photo.find({ user: user._id }).populate(
        'user',
        'avatar displayName',
      )) as IPhoto[];
      return res.send(photos);
    }

    const photos = (await Photo.find().populate('user', 'avatar displayName')) as IPhoto[];
    return res.send(photos);
  } catch {
    return res.sendStatus(500);
  }
});

photosRouter.post('/', auth, imagesUpload.single('image'), async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;

    const photo = new Photo({
      user: user._id,
      title: req.body.title,
      image: req.file ? 'images/' + req.file.filename : null,
    });

    await photo.save();
    return res.send(photo);
  } catch (e) {
    return res.status(400).send(e);
  }
});

photosRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const photo = (await Photo.findById(req.params.id)) as HydratedDocument<IPhoto>;

    if (!photo) {
      return res.status(404).send({ error: 'Photo not found!' });
    }

    await photo.deleteOne();
    return res.send({ message: 'Photo deleted!' });
  } catch (e) {
    return next(e);
  }
});

export default photosRouter;
