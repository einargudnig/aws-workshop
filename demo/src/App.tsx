import { Route, Switch } from 'wouter'
import { TeamCard } from './components/TeamCard'
import MemberProfile from './pages/MemberProfile'
import { members } from './data/teamData'

const stats = [
  { label: 'Total Members', value: members.length },
  { label: 'Active', value: members.filter(m => m.status === 'active').length },
  { label: 'Away', value: members.filter(m => m.status === 'away').length },
  { label: 'Offline', value: members.filter(m => m.status === 'offline').length },
]

const TeamDashboard = () => (
  <div className="min-h-screen bg-gray-50">
    <header className="bg-white border-b border-gray-200 px-8 py-5">
      <h1 className="text-2xl font-bold text-gray-900">Team Dashboard</h1>
      <p className="text-sm text-gray-500 mt-0.5">People & status at a glance</p>
    </header>

    <main className="max-w-5xl mx-auto px-8 py-8 space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Team grid */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">All Members</h2>
        <p className="text-sm text-gray-400 mb-4">Click a card to view full profile</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {members.map(member => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </main>
  </div>
)

const App = () => (
  <Switch>
    <Route path="/members/:id" component={MemberProfile} />
    <Route component={TeamDashboard} />
  </Switch>
)

export default App
