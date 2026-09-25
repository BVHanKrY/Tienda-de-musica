import { useState } from 'react';
import { Camera, Video, Image, Upload, Grid, List, Heart, Eye, Plus, X, Play } from 'lucide-react';

type MediaType = 'all' | 'photos' | 'videos';
type ViewMode = 'grid' | 'list';

interface MediaItem {
  id: number;
  type: 'photo' | 'video';
  title: string;
  description: string;
  emoji: string;
  likes: number;
  views: string;
  date: string;
  duration?: string;
}

const sampleMedia: MediaItem[] = [
  { id: 1, type: 'photo', title: 'Sesión en Estudio', description: 'Grabando el nuevo álbum', emoji: '🎙️', likes: 234, views: '1.2K', date: '2026-01-15' },
  { id: 2, type: 'video', title: 'Behind the Scenes', description: 'Detrás de cámaras del videoclip', emoji: '🎬', likes: 567, views: '3.4K', date: '2026-01-12', duration: '2:30' },
  { id: 3, type: 'photo', title: 'Concierto en Vivo', description: 'Noche increíble en el festival', emoji: '🎸', likes: 891, views: '5.1K', date: '2026-01-10' },
  { id: 4, type: 'video', title: 'Acústico Session', description: 'Versión acústica exclusiva', emoji: '🎹', likes: 445, views: '2.8K', date: '2026-01-08', duration: '4:15' },
  { id: 5, type: 'photo', title: 'Portada del Álbum', description: 'Arte final del nuevo disco', emoji: '💿', likes: 1200, views: '8.2K', date: '2026-01-05' },
  { id: 6, type: 'photo', title: 'Fan Meeting', description: 'Conociendo a los fans', emoji: '🤝', likes: 678, views: '4.1K', date: '2026-01-03' },
  { id: 7, type: 'video', title: 'Making Of', description: 'Proceso creativo del videoclip', emoji: '🎥', likes: 334, views: '1.9K', date: '2026-01-01', duration: '5:42' },
  { id: 8, type: 'photo', title: 'Backstage', description: 'Momentos antes del show', emoji: '🌟', likes: 456, views: '2.3K', date: '2025-12-28' },
  { id: 9, type: 'video', title: 'Tour Documentary', description: 'Documental de la gira', emoji: '🚌', likes: 789, views: '6.7K', date: '2025-12-25', duration: '12:30' },
  { id: 10, type: 'photo', title: 'Sesión de Fotos', description: 'Fotos oficiales para prensa', emoji: '📸', likes: 567, views: '3.2K', date: '2025-12-20' },
  { id: 11, type: 'photo', title: 'Vinyl Edition', description: 'Edición especial en vinilo', emoji: '🎵', likes: 890, views: '4.5K', date: '2025-12-18' },
  { id: 12, type: 'video', title: 'Live Performance', description: 'Presentación en vivo completa', emoji: '🎤', likes: 1500, views: '12K', date: '2025-12-15', duration: '45:00' },
];

export default function MediaGalleryPage() {
  const [mediaType, setMediaType] = useState<MediaType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(sampleMedia);
  const [uploadForm, setUploadForm] = useState({ title: '', description: '', emoji: '📸' });

  const filteredMedia = mediaItems.filter(item => {
    if (mediaType === 'all') return true;
    if (mediaType === 'photos') return item.type === 'photo';
    if (mediaType === 'videos') return item.type === 'video';
    return true;
  });

  const toggleLike = (id: number) => {
    if (likedItems.includes(id)) {
      setLikedItems(likedItems.filter(l => l !== id));
    } else {
      setLikedItems([...likedItems, id]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: MediaItem = {
      id: Date.now(),
      type: 'photo',
      title: uploadForm.title,
      description: uploadForm.description,
      emoji: uploadForm.emoji,
      likes: 0,
      views: '0',
      date: new Date().toISOString().split('T')[0],
    };
    setMediaItems([newItem, ...mediaItems]);
    setUploadForm({ title: '', description: '', emoji: '📸' });
    setShowUploadModal(false);
  };

  const emojis = ['📸', '🎬', '🎥', '🎙️', '🎸', '🎹', '🎤', '🌟', '💿', '🎵', '🔥', '💫', '⚡', '🌊', '🌙', '🎶'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Catálogo de Fotos & Videos</h1>
          <p className="text-gray-400 mt-1">Sube y comparte tu contenido visual</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium text-white hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25"
        >
          <Plus className="w-4 h-4" />
          Subir Contenido
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex gap-2">
          <button
            onClick={() => setMediaType('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              mediaType === 'all' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Grid className="w-4 h-4" />
            Todos
          </button>
          <button
            onClick={() => setMediaType('photos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              mediaType === 'photos' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Image className="w-4 h-4" />
            Fotos
          </button>
          <button
            onClick={() => setMediaType('videos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              mediaType === 'videos' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Video className="w-4 h-4" />
            Videos
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="glass-effect rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{mediaItems.filter(i => i.type === 'photo').length}</div>
          <div className="text-sm text-gray-400">Fotos</div>
        </div>
        <div className="glass-effect rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{mediaItems.filter(i => i.type === 'video').length}</div>
          <div className="text-sm text-gray-400">Videos</div>
        </div>
        <div className="glass-effect rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{mediaItems.reduce((sum, i) => sum + i.likes, 0).toLocaleString()}</div>
          <div className="text-sm text-gray-400">Likes totales</div>
        </div>
      </div>

      {/* Gallery Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="glass-effect rounded-2xl overflow-hidden card-glow transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className={`relative ${item.type === 'video' ? 'h-48' : 'h-40'} bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center`}>
                <span className="text-5xl">{item.emoji}</span>
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                  </div>
                )}
                {item.duration && (
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 rounded text-xs text-white">
                    {item.duration}
                  </span>
                )}
                <div className="absolute top-2 left-2">
                  {item.type === 'video' ? (
                    <span className="px-2 py-0.5 bg-red-500/80 rounded text-xs text-white font-medium">VIDEO</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-blue-500/80 rounded text-xs text-white font-medium">FOTO</span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white truncate">{item.title}</h3>
                <p className="text-sm text-gray-400 truncate mt-0.5">{item.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() => toggleLike(item.id)}
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${likedItems.includes(item.id) ? 'text-pink-500 fill-pink-500' : ''}`} />
                    {item.likes + (likedItems.includes(item.id) ? 1 : 0)}
                  </button>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Eye className="w-3.5 h-3.5" />
                    {item.views}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredMedia.map((item) => (
            <div key={item.id} className="glass-effect rounded-xl p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600/50 to-pink-600/50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white truncate">{item.title}</h3>
                  {item.type === 'video' ? (
                    <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">VIDEO</span>
                  ) : (
                    <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">FOTO</span>
                  )}
                </div>
                <p className="text-sm text-gray-400 truncate">{item.description}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-xs text-gray-500">{item.date}</span>
                  {item.duration && <span className="text-xs text-gray-500">⏱ {item.duration}</span>}
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <button
                  onClick={() => toggleLike(item.id)}
                  className="flex items-center gap-1 text-sm text-gray-400 hover:text-pink-400 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${likedItems.includes(item.id) ? 'text-pink-500 fill-pink-500' : ''}`} />
                  {item.likes + (likedItems.includes(item.id) ? 1 : 0)}
                </button>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Eye className="w-3.5 h-3.5" />
                  {item.views}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowUploadModal(false)} />
          <div className="relative glass-effect rounded-2xl p-6 w-full max-w-md border border-white/10">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Camera className="w-5 h-5 text-purple-400" />
              Subir Contenido
            </h2>
            <form onSubmit={handleUpload} className="space-y-4">
              {/* File Upload Area */}
              <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-purple-500/50 transition-colors">
                <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Arrastra archivos aquí o haz clic para seleccionar</p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF, MP4, MOV (máx. 500MB)</p>
                <input type="file" accept="image/*,video/*" className="hidden" id="media-upload" />
                <label htmlFor="media-upload" className="inline-block mt-3 px-4 py-2 bg-purple-600 rounded-lg text-sm text-white cursor-pointer hover:bg-purple-500 transition-colors">
                  Seleccionar Archivo
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Título</label>
                <input
                  type="text"
                  required
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  placeholder="Título del contenido"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  placeholder="Describe tu contenido..."
                  rows={2}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Icono</label>
                <div className="flex flex-wrap gap-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setUploadForm({ ...uploadForm, emoji })}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-all ${
                        uploadForm.emoji === emoji ? 'bg-purple-600 scale-110' : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                Publicar Contenido
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
