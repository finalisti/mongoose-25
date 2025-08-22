import mongoose from 'mongoose';
import {Category} from '../../types/Category';

const categorySchema = new mongoose.Schema<Category>({
  category_name: {
    type: String,
    minLength: 2,
    unique: true,
    required: true,
  },
});

export default mongoose.model<Category>('Category', categorySchema);
