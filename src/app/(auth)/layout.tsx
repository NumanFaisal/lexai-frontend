import { Scale } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary px-4">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold">
            <Scale className="h-5 w-5 text-bg-primary" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <h1 className="font-serif text-xl font-bold text-text-primary">
              LexAI
            </h1>
            <p className="mt-1 text-[9px] font-medium uppercase tracking-[1.5px] text-text-muted">
              Indian Law · AI
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
