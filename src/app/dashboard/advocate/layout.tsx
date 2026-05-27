import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axios from 'axios';

export default async function AdvocateLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:4000';
    const response = await axios.get(`${apiBase}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = response.data;

    // Redirect if they aren't an advocate
    if (user.data?.persona !== 'ADVOCATE') {
      redirect('/auth/callback');
    }
  } catch (error) {
    console.error('Error in AdvocateLayout:', error);
    redirect('/auth/callback');
  }

  return <>{children}</>;
}
