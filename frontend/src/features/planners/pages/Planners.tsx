import { PageHeader } from '@/app/components/PageHeader';
import { Add } from '@mui/icons-material';

export function Planners() {
  return (
    <div className="px-6 py-11 md:py-11 md:px-11 flex flex-col gap-8 w-full">
      <PageHeader
        title="Planos de Estudo"
        buttonLabel="Criar Plano"
        iconLeft={<Add sx={{ stroke: 'currentColor', strokeWidth: 1.2 }} />}
      />
      <main>
        <h1>Planos de estudo</h1>
        <h2>Plano 1</h2>
        <h2>Plano 2</h2>
      </main>
    </div>
  );
}
