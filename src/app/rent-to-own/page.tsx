import type { Metadata } from 'next';
import RentToOwnPageClient from '@/components/RentToOwnPageClient';

export const metadata: Metadata = {
  title: 'Rent-to-Own Properties',
  description: 'Explore rent-to-own property programmes in Malaysia. Secure your home with as little as RM5,000 deposit and build equity while you rent.',
};

export default function RentToOwnPage() {
  return <RentToOwnPageClient />;
}
