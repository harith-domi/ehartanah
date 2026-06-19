import type { Metadata } from 'next';
import ShortlistClient from './ShortlistClient';

export const metadata: Metadata = {
  title: 'My Shortlist — eHartanah Malaysia',
  description: 'Properties you have saved for later.',
};

export default function ShortlistPage() {
  return <ShortlistClient />;
}
