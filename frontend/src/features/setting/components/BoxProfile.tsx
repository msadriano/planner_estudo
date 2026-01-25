import { PhotoCamera } from '@mui/icons-material';
import { useProfileAvatar } from '../hooks/useProfileAvatar';

export function BoxProfile() {
  const {
    fileInputRef,
    isUploading,
    error,
    avatarUrl,
    openFileDialog,
    handleFileChange,
    userData,
  } = useProfileAvatar();

  console.log(avatarUrl);

  return (
    <div className="flex justify-center bg-white rounded-lg items-center p-6 border border-gray-100 shadow-xs flex-col gap-5 md:flex-row md:justify-start">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="h-28 w-28 relative">
        <div className="bg-white w-full h-full rounded-full flex items-center justify-center p-1 shadow-lg border border-gray-200">
          <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <button
          className="absolute bottom-0 right-0 h-10 w-10 bg-blue-primary rounded-full border-4 border-white text-white shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          aria-label="Alterar foto de perfil"
          onClick={openFileDialog}
          disabled={isUploading}
        >
          <PhotoCamera sx={{ fontSize: 16 }} />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center md:flex-1 md:items-start">
        <h2 className="text-gray-800 text-xl font-bold">
          {userData.name || ''}
        </h2>
        <p className="text-graphite text-sm font-normal">
          Membro desde Janeiro 2024
        </p>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

        {isUploading && (
          <p className="text-blue-500 text-xs mt-2">Fazendo upload...</p>
        )}
      </div>
      <button
        onClick={openFileDialog}
        disabled={isUploading}
        className="text-xs font-semibold border rounded-lg p-2 border-gray-300 outline-none cursor-pointer shadow-sm hover:scale-110 hover:bg-gray-100 text-graphite disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-transform"
      >
        {isUploading ? 'Enviando...' : 'Alterar Foto'}
      </button>
    </div>
  );
}
