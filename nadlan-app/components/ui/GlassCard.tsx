import { cn } from '@/lib/utils';

/* לוח זכוכית חד: טשטוש רקע, קו דק, בלי עיגולים ובלי צל רך. */
export function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'border border-line bg-[color-mix(in_srgb,var(--bg)_58%,transparent)] backdrop-blur-xl backdrop-saturate-150',
        className,
      )}
    >
      {children}
    </div>
  );
}
