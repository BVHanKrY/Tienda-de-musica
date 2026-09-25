import { useState } from 'react';
import { ShoppingCart, Play, Heart, Search, Filter, Star } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  genre: string;
  price: number;
  rating: number;
  cover: string;
  duration: string;
}

const storeTracks: Track[] = [
  { id: 1, title: 'Noches de Neón', artist: 'Luna Digital', genre: 'Electrónica', price: 2.99, rating: 4.8, cover: '🎵', duration: '3:42' },
  { id: 2, title: 'Ritmo Salvaje', artist: 'MC Fuego', genre: 'Reggaetón', price: 1.99, rating: 4.6, cover: '🔥', duration: '4:15' },
  { id: 3, title: 'Amanecer', artist: 'Sofía Voz', genre: 'Pop', price: 3.49, rating: 4.9, cover: '🌅', duration: '3:28' },
  { id: 4, title: 'Beat Urbano', artist: 'DJ Shadow', genre: 'Hip-Hop', price: 2.49, rating: 4.5, cover: '🎧', duration: '3:55' },
  { id: 5, title: 'Sueños Profundos', artist: 'Aurora', genre: 'Indie', price: 2.99, rating: 4.7, cover: '💫', duration: '4:02' },
  { id: 6, title: 'Fuego Latino', artist: 'Carlos Ritmo', genre: 'Latino', price: 1.99, rating: 4.8, cover: '🎶', duration: '3:18' },
  { id: 7, title: 'Tormenta Eléctrica', artist: 'Volt', genre: 'Rock', price: 2.99, rating: 4.4, cover: '⚡', duration: '4:30' },
  { id: 8, title: 'Mar de Cristal', artist: 'Oceana', genre: 'Ambient', price: 3.99, rating: 4.9, cover: '🌊', duration: '5:12' },
  { id: 9, title: 'Calle Luna', artist: 'Nocturno', genre: 'Jazz', price: 2.49, rating: 4.6, cover: '🌙', duration: '4:45' },
  { id: 10, title: 'Desierto Dorado', artist: 'Sahara Beats', genre: 'World', price: 2.99, rating: 4.7, cover: '🏜️', duration: '3:33' },
  { id: 11, title: 'Cosmos Infinito', artist: 'Nebula', genre: 'Electrónica', price: 3.49, rating: 4.8, cover: '🚀', duration: '4:20' },
  { id: 12, title: 'Raíces', artist: 'Tierra Viva', genre: 'Folk', price: 1.99, rating: 4.5, cover: '🌿', duration: '3:50' },
];

const genres = ['Todos', 'Electrónica', 'Pop', 'Reggaetón', 'Hip-Hop', 'Indie', 'Rock', 'Jazz', 'Latino', 'Ambient', 'World', 'Folk'];

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredTracks = storeTracks.filter((track) => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'Todos' || track.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const addToCart = (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const totalPrice = storeTracks
    .filter(t => cart.includes(t.id))
    .reduce((sum, t) => sum + t.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Tienda de Música</h1>
          <p className="text-gray-400 mt-1">Descubre y compra tu música favorita</p>
        </div>
        {cart.length > 0 && (
          <div className="glass-effect rounded-xl px-4 py-3 flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">{cart.length} items</span>
            <span className="text-purple-400 font-bold">${totalPrice.toFixed(2)}</span>
            <button className="ml-2 px-4 py-1.5 bg-purple-600 rounded-lg text-sm font-medium text-white hover:bg-purple-500 transition-colors">
              Comprar
            </button>
          </div>
        )}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar canciones o artistas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer"
          >
            {genres.map(genre => (
              <option key={genre} value={genre} className="bg-gray-900">{genre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Genre Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedGenre === genre
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTracks.map((track) => (
          <div
            key={track.id}
            className="glass-effect rounded-2xl overflow-hidden card-glow transition-all duration-300 hover:scale-[1.02] group"
          >
            {/* Cover */}
            <div className="relative h-40 bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
              <span className="text-6xl">{track.cover}</span>
              <button
                onClick={() => toggleFavorite(track.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <Heart className={`w-4 h-4 ${favorites.includes(track.id) ? 'text-pink-500 fill-pink-500' : 'text-white'}`} />
              </button>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors">
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </button>
              </div>
            </div>
            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold text-white truncate">{track.title}</h3>
              <p className="text-sm text-gray-400 truncate">{track.artist}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-400">{track.rating}</span>
                  <span className="text-xs text-gray-600 ml-1">• {track.duration}</span>
                </div>
                <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full">{track.genre}</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-white">${track.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(track.id)}
                  disabled={cart.includes(track.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    cart.includes(track.id)
                      ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                      : 'bg-purple-600 text-white hover:bg-purple-500'
                  }`}
                >
                  {cart.includes(track.id) ? '✓ Agregado' : 'Comprar'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTracks.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No se encontraron resultados</h3>
          <p className="text-gray-400">Intenta con otra búsqueda o género</p>
        </div>
      )}
    </div>
  );
}
