import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-bg-primary flex min-h-screen w-full items-center justify-center p-4">
      {children}
    </div>
  );
}
