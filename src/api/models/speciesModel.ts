import mongoose from 'mongoose';
import {Polygon} from 'geojson';
import {Species, SpeciesModel} from '../../types/Species';

const speciesSchema = new mongoose.Schema<Species>({
  species_name: {
    type: String,
    minLength: 2,
    unique: true,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere',
    },
  },
  image: {
    type: String,
    required: true,
  },
});

speciesSchema.statics.findByArea = function (polygon: Polygon) {
  return this.find(
    {
      location: {
        $geoWithin: {
          $geometry: {
            type: 'Polygon',
            coordinates: polygon.coordinates,
          },
        },
      },
    },
    {
      __v: 0,
    },
  );
};

export default mongoose.model<Species, SpeciesModel>('Species', speciesSchema);
