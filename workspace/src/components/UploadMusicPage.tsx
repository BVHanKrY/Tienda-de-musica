import { useState } from 'react';
import { Upload, Music, Image, DollarSign, Tag, FileAudio, CheckCircle, X, Plus } from 'lucide-react';

interface UploadedTrack {
  id: number;
  title: string;
  artist: string;
  genre: string;
  price: number;
  cover: string;
  status: 'publicado' | 'pendiente' | 'borrador';
}

export default function UploadMusicPage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'my-music'>('upload');
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: '',
    price: '',
    description: '',
    coverEmoji: '🎵',
  });
  const [uploadedTracks, setUploadedTracks] = useState<UploadedTrack[]>([
    { id: 1, title: 'Mi Primera Canción', artist: 'Yo', genre: 'Pop', price: 2.99, cover: '🎵', status: 'publicado' },
    { id: 2, title: 'Beat Experimental', artist: 'Yo', genre: 'Electrónica', price: 1.99, cover: '🎧', status: 'pendiente' },
    { id: 3, title: 'Acústica Nocturna', artist: 'Yo', genre: 'Indie', price: 0, cover: '🌙', status: 'borrador' },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const emojis = ['🎵', '🎶', '🎸', '🎹', '🥁', '🎺', '🎷', '🎻', '🔥', '💫', '⚡', '🌊', '🌙', '☀️', '🌈', '💎'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrack: UploadedTrack = {
      id: Date.now(),
      title: formData.title,
      artist: formData.artist,
      genre: formData.genre,
      price: parseFloat(formData.price) || 0,
      cover: formData.coverEmoji,
      status: 'pendiente',
    };
    setUploadedTracks([newTrack, ...uploadedTracks]);
    setFormData({ title: '', artist: '', genre: '', price: '', description: '', coverEmoji: '🎵' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'publicado':
        return <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">✓ Publicado</span>;
      case 'pendiente':
        return <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30">⏳ Pendiente</span>;
      case 'borrador':
        return <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 text-xs rounded-full border border-gray-500/30">📝 Borrador</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Subir Música</h1>
        <p className="text-gray-400 mt-1">Publica y vende tu música en la plataforma</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'upload'
              ? 'bg-purple-600 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Upload className="w-4 h-4" />
          Subir Nueva
        </button>
        <button
          onClick={() => setActiveTab('my-music')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'my-music'
              ? 'bg-purple-600 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Music className="w-4 h-4" />
          Mi Música ({uploadedTracks.length})
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-medium">¡Canción subida exitosamente! Será revisada antes de publicarse.</span>
        </div>
      )}

      {activeTab === 'upload' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-effect rounded-2xl p-6 space-y-6">
              {/* File Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  dragActive
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/20 hover:border-purple-500/50'
                }`}
              >
                <FileAudio className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Arrastra tu archivo de audio aquí</h3>
                <p className="text-gray-400 text-sm mb-4">Soporta MP3, WAV, FLAC, OGG (máx. 100MB)</p>
                <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 rounded-xl text-white font-medium cursor-pointer hover:bg-purple-500 transition-colors">
                  <Plus className="w-4 h-4" />
                  Seleccionar Archivo
                  <input type="file" accept="audio/*" className="hidden" />
                </label>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Tag className="w-4 h-4 inline mr-1" />
                    Título de la canción *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Nombre de tu canción"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Music className="w-4 h-4 inline mr-1" />
                    Artista *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                    placeholder="Tu nombre artístico"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Tag className="w-4 h-4 inline mr-1" />
                    Género *
                  </label>
                  <select
                    required
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-gray-900">Seleccionar género</option>
                    <option value="Pop" className="bg-gray-900">Pop</option>
                    <option value="Rock" className="bg-gray-900">Rock</option>
                    <option value="Electrónica" className="bg-gray-900">Electrónica</option>
                    <option value="Hip-Hop" className="bg-gray-900">Hip-Hop</option>
                    <option value="Reggaetón" className="bg-gray-900">Reggaetón</option>
                    <option value="Indie" className="bg-gray-900">Indie</option>
                    <option value="Jazz" className="bg-gray-900">Jazz</option>
                    <option value="Latino" className="bg-gray-900">Latino</option>
                    <option value="Clásica" className="bg-gray-900">Clásica</option>
                    <option value="Ambient" className="bg-gray-900">Ambient</option>
                    <option value="Folk" className="bg-gray-900">Folk</option>
                    <option value="World" className="bg-gray-900">World</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Precio (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00 (0 para gratis)"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe tu canción..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>

              {/* Cover Emoji Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Image className="w-4 h-4 inline mr-1" />
                  Icono de portada
                </label>
                <div className="flex flex-wrap gap-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setFormData({ ...formData, coverEmoji: emoji })}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                        formData.coverEmoji === emoji
                          ? 'bg-purple-600 scale-110'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Subir Canción
              </button>
            </form>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4">📋 Requisitos</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Formato: MP3, WAV, FLAC, OGG
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Tamaño máximo: 100MB
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Calidad mínima: 128kbps
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Contenido original o con licencia
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Sin contenido ofensivo
                </li>
              </ul>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4">💰 Ganancias</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tu ganancia</span>
                  <span className="text-green-400 font-medium">85%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Comisión plataforma</span>
                  <span className="text-gray-300">15%</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-gray-300 font-medium">Pago mínimo</span>
                  <span className="text-white font-bold">$10.00</span>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4">📊 Estadísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Canciones subidas</span>
                  <span className="text-white font-medium">{uploadedTracks.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Publicadas</span>
                  <span className="text-green-400 font-medium">{uploadedTracks.filter(t => t.status === 'publicado').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Ventas totales</span>
                  <span className="text-purple-400 font-medium">$0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* My Music Tab */
        <div className="space-y-4">
          {uploadedTracks.length === 0 ? (
            <div className="text-center py-16 glass-effect rounded-2xl">
              <div className="text-5xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold text-white mb-2">No has subido música aún</h3>
              <p className="text-gray-400 mb-4">Comienza a compartir tu talento con el mundo</p>
              <button
                onClick={() => setActiveTab('upload')}
                className="px-6 py-2.5 bg-purple-600 rounded-xl text-white font-medium hover:bg-purple-500 transition-colors"
              >
                Subir tu primera canción
              </button>
            </div>
          ) : (
            uploadedTracks.map((track) => (
              <div key={track.id} className="glass-effect rounded-2xl p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600/50 to-pink-600/50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {track.cover}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{track.title}</h3>
                  <p className="text-sm text-gray-400">{track.artist} • {track.genre}</p>
                </div>
                <div className="hidden sm:block">
                  {track.price > 0 ? (
                    <span className="text-white font-medium">${track.price.toFixed(2)}</span>
                  ) : (
                    <span className="text-green-400 font-medium">Gratis</span>
                  )}
                </div>
                <div className="flex-shrink-0">
                  {getStatusBadge(track.status)}
                </div>
                <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
