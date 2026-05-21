import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import axios from 'axios';

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const authObj = await auth();
  const token = await authObj.getToken();

  if (!token) {
    redirect('/auth/login');
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = response.data;

    // Redirect if they aren't student
    if (user.data?.persona !== 'STUDENT') {
      redirect('/auth/callback');
    }
  } catch (error) {
    console.error('Error in StudentLayout:', error);
    redirect('/auth/callback');
  }

  return <>{children}</>;
}
