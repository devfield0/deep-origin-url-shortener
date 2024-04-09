import express, { Request, Response } from 'express';
import { generateSlug, isValidUrl } from '../utils';
import { ShortenedUrl } from "../models/ShortenedUrl";

const router = express.Router();


// Shorten URL endpoint
router.post('/api/shorten', async (req: Request, res: Response) => {
  const { url, customSlug, user } = req.body;

  // Validate URL
  if (!isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  // Generate slug
  const slug = customSlug || generateSlug();
  const short_url = `${req.protocol}://${req.get('host')}/${slug}`;

  // Save to database
  const shortenedUrl = await ShortenedUrl.create({ url, slug, short_url, user: user });

  res.json({ shortenedUrl });
});

router.get('/api/user/urls', async (req: Request, res: Response) => {
  try {
    // Retrieve the user ID from the request or session
    const { user } = req.query; // Assuming the user ID is available in the request user object

    // Query the database for all URLs associated with the user
    const userUrls = await ShortenedUrl.find({ user: user });

    res.json({ userUrls });
  } catch (error) {
    console.error('Error fetching user URLs:', error);
    res.status(500).json({ error: 'Failed to fetch user URLs' });
  }
});

// Redirect endpoint
router.get('/:slug', async (req: Request, res: Response) => {
  const { slug } = req.params;

  // Find URL in database
  const shortenedUrl = await ShortenedUrl.findOne({ slug });

  if (!shortenedUrl) {
    return res.status(404).json({ error: 'Not Found' });
  }

  // Increment visit count
  shortenedUrl.visits++;
  await shortenedUrl.save();

  res.redirect(shortenedUrl.url);
});

export default router;