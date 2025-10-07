import { useFavorites } from '../../hooks/useFavorites';
import { useAuth } from '../../firebase/useAuth';
import { favoritesApi } from '../../services/favoritesApi';
import { useState } from 'react';

export const FavoritesDebug = () => {
  const { user } = useAuth();
  const { favorites, loading, error, isAuthenticated } = useFavorites();
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  const checkApiStatus = async () => {
    setApiStatus('checking');
    const isOnline = await favoritesApi.checkHealth();
    setApiStatus(isOnline ? 'online' : 'offline');
  };

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">🐛 Favorites Debug</h3>
      
      <div className="space-y-1">
        <div><strong>User:</strong> {user?.email || 'Not logged in'}</div>
        <div><strong>UID:</strong> {user?.uid || 'N/A'}</div>
        <div><strong>Authenticated:</strong> {isAuthenticated ? '✅' : '❌'}</div>
        <div><strong>Loading:</strong> {loading ? '⏳' : '✅'}</div>
        <div><strong>API Status:</strong> 
          <span className={`ml-1 ${apiStatus === 'online' ? 'text-green-400' : apiStatus === 'offline' ? 'text-red-400' : 'text-yellow-400'}`}>
            {apiStatus === 'checking' ? '🔍 Checking...' : apiStatus === 'online' ? '✅ Online' : '❌ Offline'}
          </span>
        </div>
        <div><strong>Favorites Count:</strong> {favorites.length}</div>
        <div><strong>Favorites:</strong> {favorites.join(', ') || 'None'}</div>
        {error && <div className="text-red-400"><strong>Error:</strong> {error}</div>}
      </div>

      <button 
        onClick={checkApiStatus}
        className="mt-2 px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
      >
        Test API
      </button>

      <button 
        onClick={() => {
          if (user?.uid) {
            const localFavorites = localStorage.getItem(`favorites_${user.uid}`);
            console.log('Local favorites:', localFavorites);
          }
        }}
        className="mt-1 ml-2 px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded text-xs"
      >
        Check Local
      </button>
    </div>
  );
};
