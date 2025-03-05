import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
}

const movieSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Movie = mongoose.models.Movie || mongoose.model<IMovie>('Movie', movieSchema);

export default Movie;
