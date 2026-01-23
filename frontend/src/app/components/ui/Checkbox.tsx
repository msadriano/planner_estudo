import { Check } from '@mui/icons-material';
import { cn } from '@/app/utils/cn';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Checkbox({ label, checked, onCheckedChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      {/* Container do Checkbox */}
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          className="peer sr-only" // Esconde o checkbox padrão mas mantém acessível
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
        />

        {/* O Box customizado */}
        <div
          className={cn(
            'h-6 w-6 rounded-md border-2 transition-all duration-200 flex items-center justify-center',
            'border-gray-300 bg-white', // Estado desmarcado
            'peer-checked:border-blue-primary peer-checked:bg-blue-primary', // Estado marcado
          )}
        >
          {/* Ícone de Check (só aparece quando marcado) */}
          <Check
            className={cn(
              'text-white transition-opacity duration-200',
              checked ? 'opacity-100' : 'opacity-0',
            )}
            sx={{ fontSize: 16 }}
          />
        </div>
      </div>

      {/* Texto do Label */}
      <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-primary transition-colors">
        {label}
      </span>
    </label>
  );
}
