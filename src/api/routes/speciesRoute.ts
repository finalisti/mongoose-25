import express from 'express';
import {
  deleteSpecies,
  getSpecies,
  getSpeciesById,
  postSpecies,
  putSpecies,
  findByArea,
} from '../controllers/speciesController';

const router = express.Router();

router.route('/').post(postSpecies).get(getSpecies);

router.route('/area').post(findByArea);

router.route('/:id').get(getSpeciesById).put(putSpecies).delete(deleteSpecies);

export default router;
