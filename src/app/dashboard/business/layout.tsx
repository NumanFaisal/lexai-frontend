import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axios from 'axios';

export default async function BusinessLayout({ children }: { children: React.ReactNode }) {
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

    // Redirect if they aren't business
    if (user.data?.persona !== 'BUSINESS') {
      redirect('/auth/callback');
    }
  } catch (error) {
    console.error('Error in BusinessLayout:', error);
    redirect('/auth/callback');
  }

  return <>{children}</>;
}
