import { cn } from '@/lib/utils';

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-block border border-current px-2.5 py-0.5 text-[0.8rem] leading-6', className)}>
      {children}
    </span>
  );
}
