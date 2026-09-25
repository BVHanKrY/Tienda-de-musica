import { useState } from 'react';
import { Music, ShoppingBag, Upload, Camera, User, Menu, X, Headphones } from 'lucide-react';
import HomePage from './components/HomePage';
import StorePage from './components/StorePage';
import UploadMusicPage from './components/UploadMusicPage';
import MediaGalleryPage from './components/MediaGalleryPage';
import ProfilePage from './components/ProfilePage';

type Page = 'home' | 'store' | 'upload' | 'gallery' | 'profile';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as Page, label: 'Inicio', icon: Headphones },
    { id: 'store' as Page, label: 'Tienda', icon: ShoppingBag },
    { id: 'upload' as Page, label: 'Subir Música', icon: Upload },
    { id: 'gallery' as Page, label: 'Fotos & Videos', icon: Camera },
    { id: 'profile' as Page, label: 'Mi Perfil', icon: User },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={setCurrentPage} />;
      case 'store': return <StorePage />;
      case 'upload': return <UploadMusicPage />;
      case 'gallery': return <MediaGalleryPage />;
      case 'profile': return <ProfilePage />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SoundWave
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-effect border-t border-white/10">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-purple-600/30 text-purple-300'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Music className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">SoundWave</span>
            </div>
            <p className="text-gray-500 text-sm">© 2026 SoundWave. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">Términos</a>
              <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">Privacidad</a>
              <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
