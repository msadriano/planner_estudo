import { PhotoCamera } from '@mui/icons-material';
import { useProfileAvatar } from '../hooks/useProfileAvatar';
import { useProfile } from '../hooks/useProfile';

export function BoxProfile() {
  const { userData, profileService, fetchUserData } = useProfile();

  const {
    fileInputRef,
    isUploading,
    error,
    avatarUrl,
    openFileDialog,
    handleFileChange,
  } = useProfileAvatar({
    userData,
    profileService,
    fetchUserData,
  });

  const date = new Date(userData.createdAt);
  const monthName = date.toLocaleDateString('pt-BR', { month: 'long' });
  const createdMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const createdYear = date.getUTCFullYear();

  return (
    <div className="flex justify-center bg-white-full rounded-lg items-center p-6 border border-border-gray-100 shadow-xs flex-col gap-5 md:flex-row md:justify-start transition-all">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="h-28 w-28 relative">
        <div className="bg-white-full w-full h-full rounded-full flex items-center justify-center p-1 shadow-lg border border-border-gray-200 transition-all">
          <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
            <img
              key={avatarUrl} 
              src={avatarUrl}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <button
          className="absolute bottom-0 right-0 h-10 w-10 bg-blue-primary rounded-full border-4 border-white-full text-white shadow-sm cursor-pointer disabled:opacity-50 hover:bg-blue-600 transition-all"
          onClick={openFileDialog}
          disabled={isUploading}
        >
          <PhotoCamera sx={{ fontSize: 16 }} />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center md:flex-1 md:items-start">
        <h2 className="text-border-gray-800 text-xl font-bold transition-all">{userData.name}</h2>
        <p className="text-graphite text-sm font-normal transition-all">
          Membro desde {createdMonth} de {createdYear}
        </p>
        {error && <p className="text-danger-red-500 text-xs mt-2 transition-all">{error}</p>}
      </div>
      <button
        onClick={openFileDialog}
        disabled={isUploading}
        className="text-xs font-semibold border rounded-lg p-2 border-border-gray-300 outline-none cursor-pointer shadow-sm hover:scale-110 hover:bg-blue-600 hover:text-white text-graphite disabled:opacity-50 transition-all"
      >
        {isUploading ? 'Enviando...' : 'Alterar Foto'}
      </button>
    </div>
  );
}
