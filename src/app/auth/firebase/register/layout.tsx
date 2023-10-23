'use client';

// auth
import { GuestGuard } from '@/auth/guard';
// components
import AuthClassicLayout from '@/layouts/auth/classic';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthClassicLayout title="Manage the job more effectively with DBundles">
        {children}
      </AuthClassicLayout>
    </GuestGuard>
  );
}