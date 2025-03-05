import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongodb';
import Movie from '../../models/Movie';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await connectDB();

  try {
    const movies = await Movie.find({});
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

export default handler;
