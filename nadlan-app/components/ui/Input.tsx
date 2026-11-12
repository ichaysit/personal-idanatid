import { cn } from '@/lib/utils';

type Base = { label: string; name: string; className?: string; required?: boolean };

const field =
  'w-full border-0 border-b border-fg/40 bg-transparent px-0 py-2.5 text-fg placeholder:text-mute/70 focus:border-acc focus:outline-none focus-visible:outline-none transition-colors';

export function Input({
  label,
  name,
  className,
  required,
  type = 'text',
  placeholder,
  ltr,
}: Base & { type?: string; placeholder?: string; ltr?: boolean }) {
  return (
    <label className={cn('block', className)}>
      <span className="block text-[0.9rem] text-mute">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        dir={ltr ? 'ltr' : undefined}
        className={cn(field, ltr && 'text-end')}
      />
    </label>
  );
}

export function Select({ label, name, className, options }: Base & { options: string[] }) {
  return (
    <label className={cn('block', className)}>
      <span className="block text-[0.9rem] text-mute">{label}</span>
      <select name={name} className={cn(field, 'cursor-pointer appearance-none')}>
        {options.map((o) => (
          <option key={o} value={o} className="bg-bg text-fg">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Textarea({ label, name, className, placeholder }: Base & { placeholder?: string }) {
  return (
    <label className={cn('block', className)}>
      <span className="block text-[0.9rem] text-mute">{label}</span>
      <textarea name={name} rows={3} placeholder={placeholder} className={cn(field, 'resize-none')} />
    </label>
  );
}
