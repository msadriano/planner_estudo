import { CheckCircleOutline, CircleOutlined } from '@mui/icons-material';

interface ValidationBoxProps {
  validations: {
    hasMinChars: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
}

export function ValidationBox({ validations }: ValidationBoxProps) {
  const { hasMinChars, hasUppercase, hasNumber, hasSpecialChar } = validations;

  return (
    <div className="p-3 bg-background-secondary border border-gray-200 rounded-xl w-full flex flex-col gap-2 items-center justify-center">
      <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest w-full flex justify-start items-center">
        Validação de senha
      </span>
      <div className="grid grid-cols-2 w-full">
        <div
          className={`flex flex-row gap-1 items-center justify-center
            ${hasMinChars ? 'text-green-success' : 'text-gray-500'}`}
        >
          {hasMinChars ? (
            <CheckCircleOutline sx={{ fontSize: 13 }} />
          ) : (
            <CircleOutlined sx={{ fontSize: 13 }} />
          )}
          <span className="text-xs font-medium w-full flex justify-start items-center">
            Mínimo de 6 caracteres
          </span>
        </div>
        <div
          className={`flex flex-row gap-1 items-center justify-center ${hasUppercase ? 'text-green-success' : 'text-gray-500'}`}
        >
          {hasUppercase ? (
            <CheckCircleOutline sx={{ fontSize: 13 }} />
          ) : (
            <CircleOutlined sx={{ fontSize: 13 }} />
          )}
          <span className="text-xs font-medium w-full flex justify-start items-center">
            Uma letra maiúscula
          </span>
        </div>
        <div
          className={`flex flex-row gap-1 items-center justify-center ${hasNumber ? 'text-green-success' : 'text-gray-500'}`}
        >
          {hasNumber ? (
            <CheckCircleOutline sx={{ fontSize: 13 }} />
          ) : (
            <CircleOutlined sx={{ fontSize: 13 }} />
          )}
          <span className="text-xs font-medium w-full flex justify-start items-center">
            Um número
          </span>
        </div>
        <div
          className={`flex flex-row gap-1 items-center justify-center ${hasSpecialChar ? 'text-green-success' : 'text-gray-500'}`}
        >
          {hasSpecialChar ? (
            <CheckCircleOutline sx={{ fontSize: 13 }} />
          ) : (
            <CircleOutlined sx={{ fontSize: 13 }} />
          )}
          <span className="text-xs font-medium w-full flex justify-start items-center">
            Caractere especial
          </span>
        </div>
      </div>
    </div>
  );
}
