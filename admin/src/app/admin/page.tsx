import { authConfig } from '@/lib/auth.config';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getServerSession(authConfig)

  if (!session?.user) {
    return redirect('/');
  } else {
    redirect('/admin/dashboard/');
  }
}
