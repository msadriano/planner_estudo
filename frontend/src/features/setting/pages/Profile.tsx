import { useContext, useState } from 'react';
import { AuthContext } from '@/app/store/AuthContext';
import { PageHeader } from '@/app/components/PageHeader';
import { TextArea } from '@/app/components/ui/TextArea';
import { Input } from '@/app/components/ui/Input';
import { Checkbox } from '@/app/components/ui/Checkbox';
import {
  PhotoCamera,
  BadgeOutlined,
  SettingsApplicationsOutlined,
} from '@mui/icons-material';
import { ThemeSwitcher } from './components/ThemeSwitcher';

export function Profile() {
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(true);

  const { user } = useContext(AuthContext);

  return (
    <main className="px-6 py-11 md:py-11 md:px-11 flex flex-col gap-8 w-full">
      <PageHeader
        title="Meu Perfil"
        subtitle="Gerencia sua informações pessoais, segurança e preferências de sua conta."
        buttonLabel="Salvar Alterações"
      />
      <div className="flex justify-center bg-white rounded-lg items-center p-6 border border-gray-100 shadow-xs flex-col gap-5 md:flex-row md:justify-start">
        <div className="h-28 w-28 relative">
          <div className="bg-white w-full h-full rounded-full flex items-center justify-center p-1 shadow-lg border border-gray-200">
            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="https://github.com/shadcn.png"
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 h-10 w-10 bg-blue-primary rounded-full border-4 border-white text-white shadow-sm cursor-pointer">
            <PhotoCamera sx={{ fontSize: 16 }} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center md:flex-1 md:items-start">
          <h2 className="text-gray-800 text-xl font-bold">
            {user?.name || ''}
          </h2>
          <p className="text-graphite text-sm font-normal">
            Membro desde Janeiro 2024
          </p>
        </div>
        <button className="text-xs font-semibold border rounded-lg p-2 border-gray-300 outline-none cursor-pointer shadow-sm hover:scale-110 hover:bg-gray-100 text-graphite">
          Alterar Foto
        </button>
      </div>
      <div className="flex flex-col gap-8 w-full md:flex-row">
        <div className="flex justify-center bg-white rounded-lg items-center p-6 border border-gray-100 shadow-xs flex-col gap-5 flex-1">
          <div className="w-full flex flex-row items-center justify-start gap-2.5">
            <BadgeOutlined className="text-blue-primary" />
            <p className="font-semibold text-gray-800 text-base">
              Informações Pessoais
            </p>
          </div>
          <Input type="text" legend="Nome Completo" value={user?.name} />
          <Input type="text" legend="E-mail" value={user?.email} />
          <Input type="text" legend="Idade" value={user?.idade} />
          <Input type="text" legend="Telefone" value={user?.phone} />
          <TextArea className="h-32 overflow-y-auto resize-none">
            {user?.bio}
          </TextArea>
        </div>
        <div className="flex justify-start bg-white rounded-lg items-center p-6 border border-gray-100 shadow-xs flex-col gap-5 flex-1">
          <div className="w-full flex flex-row items-center justify-start gap-2.5">
            <SettingsApplicationsOutlined className="text-blue-primary" />
            <p className="font-semibold text-gray-800 text-base">
              Preferências do Sistema
            </p>
          </div>
          <div className="flex w-full  bg-zinc-100 rounded-lg items-center p-6 flex-col md:flex-row">
            <div className="flex flex-col flex-1">
              <p className="font-bold text-graphite text-xs">Senha da Conta</p>
              <p className="text-graphite text-xs">
                Senha altera em 01/01/2025
              </p>
            </div>
            <div>
              <button
                type="button"
                className="text-blue-primary font-bold text-xs hover:underline cursor-pointer"
              >
                Alterar
              </button>
            </div>
          </div>

          <ThemeSwitcher legend="Alterar Tema" />
          <div className="flex flex-col items-start justify-center gap-1 w-full">
            <p className="text-sm font-semibold text-graphite">Notificações</p>
            <div className="grid grid-cols-2 gap-3 border border-gray-200 rounded-xl p-6 w-full">
              <Checkbox
                label="Alertas de Estudos"
                checked={alertsEnabled}
                onCheckedChange={setAlertsEnabled}
              />

              <Checkbox
                label="Resumo Semanal"
                checked={weeklySummary}
                onCheckedChange={setWeeklySummary}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center bg-white rounded-lg items-start p-6 border border-gray-100 shadow-xs flex-row gap-5 flex-1">
          <div className="flex flex-1 flex-col">
            <p className="text-sm font-bold text-red-600">Exclui Conta</p>
            <p className="text-xs text-graphite">
              Está ação removerá permanentemente todos os seus dados de estudos.
            </p>
          </div>
          <div>
            <button className="text-xs font-semibold border rounded-lg p-2 border-red-500 text-red-600 outline-none cursor-pointer transition-all hover:scale-110 shadow-sm hover:bg-red-400/10">
              Remover Conta
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
