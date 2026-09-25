import { useState } from 'react';
import { User, Music, DollarSign, TrendingUp, Settings, Edit3, Crown, Award, BarChart3, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'settings'>('overview');

  const profile = {
    name: 'Artista Demo',
    username: '@artista_demo',
    bio: 'Productor musical y artista independiente. Creando sonidos únicos desde 2020.',
    avatar: '🎤',
    followers: '12.5K',
    following: 342,
    totalPlays: '2.1M',
    totalSales: '$4,250.00',
    songsUploaded: 24,
    memberSince: 'Enero 2024',
    subscription: 'Pro',
  };

  const monthlyStats = [
    { month: 'Jul', plays: 45000, sales: 320 },
    { month: 'Ago', plays: 62000, sales: 480 },
    { month: 'Sep', plays: 58000, sales: 410 },
    { month: 'Oct', plays: 89000, sales: 620 },
    { month: 'Nov', plays: 120000, sales: 890 },
    { month: 'Dic', plays: 150000, sales: 1100 },
  ];

  const recentActivity = [
    { type: 'sale', message: 'Nueva venta: "Noches de Neón"', time: 'Hace 2 horas', amount: '+$2.99' },
    { type: 'play', message: '1000 reproducciones en "Ritmo Salvaje"', time: 'Hace 5 horas', amount: '' },
    { type: 'follower', message: '50 nuevos seguidores', time: 'Hace 1 día', amount: '' },
    { type: 'sale', message: 'Nueva venta: "Amanecer"', time: 'Hace 1 día', amount: '+$3.49' },
    { type: 'upload', message: 'Canción "Beat Nuevo" publicada', time: 'Hace 2 días', amount: '' },
    { type: 'sale', message: 'Nueva venta: "Fuego Latino"', time: 'Hace 3 días', amount: '+$1.99' },
  ];

  const maxPlays = Math.max(...monthlyStats.map(s => s.plays));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="glass-effect rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-5xl md:text-6xl flex-shrink-0 pulse-glow">
            {profile.avatar}
          </div>
          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{profile.name}</h1>
              <span className="px-3 py-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold text-white flex items-center gap-1">
                <Crown className="w-3 h-3" />
                {profile.subscription}
              </span>
            </div>
            <p className="text-gray-400 mb-1">{profile.username}</p>
            <p className="text-gray-300 text-sm max-w-lg">{profile.bio}</p>
            <div className="flex items-center justify-center md:justify-start gap-6 mt-4">
              <div className="text-center">
                <div className="font-bold text-white">{profile.followers}</div>
                <div className="text-xs text-gray-400">Seguidores</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white">{profile.following}</div>
                <div className="text-xs text-gray-400">Siguiendo</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white">{profile.totalPlays}</div>
                <div className="text-xs text-gray-400">Reproducciones</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white">{profile.songsUploaded}</div>
                <div className="text-xs text-gray-400">Canciones</div>
              </div>
            </div>
          </div>
          {/* Edit Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors">
            <Edit3 className="w-4 h-4" />
            Editar Perfil
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'overview' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Resumen
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'stats' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Estadísticas
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'settings' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Settings className="w-4 h-4" />
          Configuración
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Card */}
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Ingresos Totales</h3>
                <p className="text-2xl font-bold text-green-400">{profile.totalSales}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400">+23%</span>
              <span className="text-gray-400">vs mes anterior</span>
            </div>
          </div>

          {/* Plays Card */}
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Music className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Reproducciones</h3>
                <p className="text-2xl font-bold text-purple-400">{profile.totalPlays}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400">+18%</span>
              <span className="text-gray-400">vs mes anterior</span>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Suscripción</h3>
                <p className="text-lg font-bold text-yellow-400">Plan Pro</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              <p>85% de ganancias</p>
              <p>Subidas ilimitadas</p>
              <p className="text-purple-400 mt-1 cursor-pointer hover:underline">Mejorar plan →</p>
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2 glass-effect rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-6">Rendimiento Mensual</h3>
            <div className="flex items-end gap-3 h-40">
              {monthlyStats.map((stat) => (
                <div key={stat.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative" style={{ height: '120px' }}>
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(stat.plays / maxPlays) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{stat.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4">Actividad Reciente</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === 'sale' ? 'bg-green-400' :
                    activity.type === 'play' ? 'bg-purple-400' :
                    activity.type === 'follower' ? 'bg-pink-400' :
                    'bg-blue-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  {activity.amount && (
                    <span className="text-sm font-medium text-green-400 flex-shrink-0">{activity.amount}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="space-y-6">
          {/* Detailed Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Reproducciones hoy', value: '3,456', change: '+12%', icon: '📈' },
              { label: 'Ventas esta semana', value: '$127.50', change: '+8%', icon: '💰' },
              { label: 'Nuevos seguidores', value: '89', change: '+15%', icon: '👥' },
              { label: 'Canciones en trending', value: '3', change: '', icon: '🔥' },
            ].map((stat) => (
              <div key={stat.label} className="glass-effect rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{stat.icon}</span>
                  {stat.change && <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">{stat.change}</span>}
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Monthly Breakdown */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4">Desglose Mensual</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-gray-400 font-medium">Mes</th>
                    <th className="text-right py-3 text-gray-400 font-medium">Reproducciones</th>
                    <th className="text-right py-3 text-gray-400 font-medium">Ventas</th>
                    <th className="text-right py-3 text-gray-400 font-medium">Ingresos</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyStats.map((stat) => (
                    <tr key={stat.month} className="border-b border-white/5">
                      <td className="py-3 text-white">{stat.month}</td>
                      <td className="py-3 text-right text-gray-300">{stat.plays.toLocaleString()}</td>
                      <td className="py-3 text-right text-gray-300">{stat.sales}</td>
                      <td className="py-3 text-right text-green-400 font-medium">${(stat.sales * 0.85).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="max-w-2xl space-y-6">
          {/* Profile Settings */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" />
              Información del Perfil
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nombre artístico</label>
                <input
                  type="text"
                  defaultValue={profile.name}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Biografía</label>
                <textarea
                  defaultValue={profile.bio}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>
              <button className="px-5 py-2.5 bg-purple-600 rounded-xl text-white font-medium hover:bg-purple-500 transition-colors">
                Guardar Cambios
              </button>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Configuración de Pagos
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Método de pago</label>
                <select className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none">
                  <option className="bg-gray-900">PayPal</option>
                  <option className="bg-gray-900">Transferencia bancaria</option>
                  <option className="bg-gray-900">Stripe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email de pagos</label>
                <input
                  type="email"
                  defaultValue="artista@email.com"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div>
                  <p className="text-white font-medium text-sm">Pago automático</p>
                  <p className="text-xs text-gray-400">Recibe pagos automáticamente al alcanzar $10</p>
                </div>
                <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              Plan de Suscripción
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Free', price: '$0', features: ['5 canciones', '70% ganancias', 'Soporte básico'], current: false },
                { name: 'Pro', price: '$9.99/mes', features: ['Ilimitadas', '85% ganancias', 'Soporte prioritario', 'Analytics'], current: true },
                { name: 'Premium', price: '$19.99/mes', features: ['Todo de Pro', '95% ganancias', 'Promoción destacada', 'API acceso'], current: false },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`p-4 rounded-xl border transition-all ${
                    plan.current
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white">{plan.name}</h4>
                    {plan.current && <span className="text-xs bg-purple-600 px-2 py-0.5 rounded-full text-white">Actual</span>}
                  </div>
                  <p className="text-lg font-bold text-purple-400 mb-3">{plan.price}</p>
                  <ul className="space-y-1.5">
                    {plan.features.map((f) => (
                      <li key={f} className="text-xs text-gray-300 flex items-center gap-1">
                        <span className="text-green-400">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  {!plan.current && (
                    <button className="w-full mt-3 py-1.5 bg-white/10 rounded-lg text-sm text-white hover:bg-white/20 transition-colors">
                      Cambiar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
