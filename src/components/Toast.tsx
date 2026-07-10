import { Check } from 'lucide-react';
import { useStore } from '../store';

export function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 animate-fade-up">
      <div className="flex items-center gap-3 rounded-full bg-ink-900 px-5 py-3 text-sm text-ink-50 shadow-2xl dark:bg-ink-50 dark:text-ink-900">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-ink-900">
          <Check size={12} strokeWidth={3} />
        </span>
        {toast}
      </div>
    </div>
  );
}
