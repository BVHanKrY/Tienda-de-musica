import { Play, TrendingUp, Star, Disc3 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'home' | 'store' | 'upload' | 'gallery' | 'profile') => void;
}

const featuredTracks = [
  { id: 1, title: 'Noches de Neón', artist: 'Luna Digital', genre: 'Electrónica', plays: '2.4M', rating: 4.8, cover: '🎵' },
  { id: 2, title: 'Ritmo Salvaje', artist: 'MC Fuego', genre: 'Reggaetón', plays: '1.8M', rating: 4.6, cover: '🔥' },
  { id: 3, title: 'Amanecer', artist: 'Sofía Voz', genre: 'Pop', plays: '3.1M', rating: 4.9, cover: '🌅' },
  { id: 4, title: 'Beat Urbano', artist: 'DJ Shadow', genre: 'Hip-Hop', plays: '1.2M', rating: 4.5, cover: '🎧' },
  { id: 5, title: 'Sueños Profundos', artist: 'Aurora', genre: 'Indie', plays: '890K', rating: 4.7, cover: '💫' },
  { id: 6, title: 'Fuego Latino', artist: 'Carlos Ritmo', genre: 'Latino', plays: '2.1M', rating: 4.8, cover: '🎶' },
];

const trendingArtists = [
  { name: 'Luna Digital', followers: '1.2M', avatar: '👩‍🎤' },
  { name: 'MC Fuego', followers: '980K', avatar: '🧑‍🎤' },
  { name: 'Sofía Voz', followers: '2.1M', avatar: '🎤' },
  { name: 'DJ Shadow', followers: '750K', avatar: '🎧' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/80 z-10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        <div className="relative z-20 px-8 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              Tu Música,<br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Tu Plataforma
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Publica, vende y comparte tu música con el mundo. Sube tu catálogo de fotos y videos. Todo en un solo lugar.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('store')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25"
              >
                Explorar Tienda
              </button>
              <button
                onClick={() => onNavigate('upload')}
                className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all"
              >
                Subir Música
              </button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center float-animation pulse-glow">
              <Disc3 className="w-24 h-24 md:w-32 md:h-32 text-white/90" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Canciones', value: '50K+', icon: '🎵' },
          { label: 'Artistas', value: '12K+', icon: '🎤' },
          { label: 'Oyentes', value: '2M+', icon: '🎧' },
          { label: 'Ventas', value: '$5M+', icon: '💰' },
        ].map((stat) => (
          <div key={stat.label} className="glass-effect rounded-2xl p-6 text-center card-glow transition-all duration-300">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Featured Tracks */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Canciones Destacadas</h2>
          </div>
          <button
            onClick={() => onNavigate('store')}
            className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
          >
            Ver todas →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTracks.map((track) => (
            <div
              key={track.id}
              className="glass-effect rounded-2xl p-4 card-glow transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600/50 to-pink-600/50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {track.cover}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{track.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full">{track.genre}</span>
                    <span className="text-xs text-gray-500">{track.plays} plays</span>
                  </div>
                </div>
                <button className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-500">
                  <Play className="w-4 h-4 text-white ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Artists */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-6 h-6 text-pink-400" />
          <h2 className="text-2xl font-bold text-white">Artistas Populares</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingArtists.map((artist) => (
            <div key={artist.name} className="glass-effect rounded-2xl p-6 text-center card-glow transition-all duration-300 hover:scale-[1.02] cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                {artist.avatar}
              </div>
              <h3 className="font-semibold text-white">{artist.name}</h3>
              <p className="text-sm text-gray-400">{artist.followers} seguidores</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
