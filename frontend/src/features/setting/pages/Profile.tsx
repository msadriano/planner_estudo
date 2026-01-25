import { PageHeader } from '@/app/components/PageHeader';
import { TextArea } from '@/app/components/ui/TextArea';
import { Input } from '@/app/components/ui/Input';
import { Modal } from '@/app/components/ui/Modal';
import { Checkbox } from '@/app/components/ui/Checkbox';
import { ChangePasswordForm } from '../components/ChangePasswordForm';
import { useProfile } from '../hooks/useProfile';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { BoxProfile } from '../components/BoxProfile';
import {
  BadgeOutlined,
  SettingsApplicationsOutlined,
} from '@mui/icons-material';

export function Profile() {
  const {
    theme,
    setTheme,
    handleSaveProfile,
    alertsEnabled,
    setAlertsEnabled,
    weeklySummary,
    setWeeklySummary,
    userData,
    handleInputChange,
    isPasswordModalOpen,
    setIsPasswordModalOpen,
  } = useProfile();

  return (
    <main className="px-6 py-11 md:py-11 md:px-11 flex flex-col gap-8 w-full">
      <PageHeader
        title="Meu Perfil"
        subtitle="Gerencia sua informações pessoais, segurança e preferências de sua conta."
        buttonLabel="Salvar Alterações"
        onButtonClick={handleSaveProfile}
      />
      <BoxProfile />
      <div className="flex flex-col gap-8 w-full md:flex-row">
        <div className="flex justify-center bg-white rounded-lg items-center p-6 border border-gray-100 shadow-xs flex-col gap-5 flex-1">
          <div className="w-full flex flex-row items-center justify-start gap-2.5">
            <BadgeOutlined className="text-blue-primary" />
            <p className="font-semibold text-gray-800 text-base">
              Informações Pessoais
            </p>
          </div>
          <Input
            type="text"
            legend="Nome Completo"
            value={userData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <Input
            type="text"
            legend="E-mail"
            value={userData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          <Input
            type="text"
            legend="Idade"
            value={userData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
          />
          <Input
            type="text"
            legend="Telefone"
            value={userData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
          <TextArea
            legend="Biografia do Usuário"
            className="h-32 overflow-y-auto resize-none"
            value={userData.biography}
            onChange={(e) => handleInputChange('biography', e.target.value)}
          ></TextArea>
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
                onClick={() => setIsPasswordModalOpen(true)}
                className="text-blue-primary font-bold text-xs hover:underline cursor-pointer"
              >
                Alterar Senha
              </button>
            </div>
          </div>

          <ThemeSwitcher
            legend="Alterar Tema"
            value={theme}
            onChange={setTheme}
          />
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
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
        }}
      >
        <ChangePasswordForm />
      </Modal>
    </main>
  );
}
