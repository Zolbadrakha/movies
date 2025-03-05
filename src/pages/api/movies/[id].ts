import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import Movie from '../../../models/Movie';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { id } = req.query;

  await connectDB();

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
};

export default handler;
