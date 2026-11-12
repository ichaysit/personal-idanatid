import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: 'solid' | 'outline';
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

/* מילוי שנשפך מלמטה במעבר עכבר. בלי פינות מעוגלות. */
export function Button({ children, href, variant = 'solid', className, type = 'button', onClick }: Props) {
  const cls = cn(
    'group relative inline-flex min-h-12 items-center justify-center overflow-hidden border px-7 py-3 text-[0.95rem] font-medium no-underline transition-colors duration-300',
    variant === 'solid'
      ? 'border-acc bg-acc text-bg hover:text-acc'
      : 'border-fg/50 text-fg hover:border-fg hover:text-bg',
    className,
  );
  const fill = (
    <span
      aria-hidden
      className={cn(
        'absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-out-expo group-hover:scale-y-100',
        variant === 'solid' ? 'bg-bg' : 'bg-fg',
      )}
    />
  );
  const label = <span className="relative">{children}</span>;
  if (href)
    return (
      <a href={href} className={cls}>
        {fill}
        {label}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={cn(cls, 'cursor-pointer')}>
      {fill}
      {label}
    </button>
  );
}
