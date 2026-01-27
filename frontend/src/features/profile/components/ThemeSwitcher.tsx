import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';

interface ThemeSwitcherProps {
  legend: string;
  value: 'light' | 'dark';
  onChange: (theme: 'light' | 'dark') => void;
}

export function ThemeSwitcher({ legend, value, onChange }: ThemeSwitcherProps) {
  return (
    <div className="flex flex-col items-start justify-center gap-1 w-full">
      {legend && (
        <span className={`text-border-gray-800 font-semibold text-sm transition-all`}>{legend}</span>
      )}
      <div className="bg-border-gray-100 p-1 rounded-xl flex items-center relative w-full transition-all">
        <div
          className={`absolute h-[calc(100%-8px)] w-[calc(50%-4px)] bg-white-full rounded-lg shadow-sm transition-all duration-300 ease-in-out ${
            value === 'dark' ? 'translate-x-full' : 'translate-x-0'
          }`}
        />

        <button
          onClick={() => onChange('light')}
          className={`relative z-10 cursor-pointer flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-colors duration-300 ${
            value === 'light' ? 'text-blue-primary' : 'text-gray-500'
          }`}
        >
          <LightModeOutlined sx={{ fontSize: 18 }} />
          Claro
        </button>

        <button
          onClick={() => onChange('dark')}
          className={`relative z-10 flex-1 cursor-pointer flex items-center justify-center gap-2 py-3 text-sm font-bold transition-colors duration-300 ${
            value === 'dark' ? 'text-blue-primary' : 'text-gray-500'
          }`}
        >
          <DarkModeOutlined sx={{ fontSize: 18 }} />
          Escuro
        </button>
      </div>
    </div>
  );
}
