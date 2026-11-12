import { cn } from '@/lib/utils';

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14', className)}>{children}</div>;
}
