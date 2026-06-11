import { useParams, useLocation } from 'wouter'
import { members, mockCommits } from '../data/teamData'
import { CommitList } from '../components/CommitList'

const statusStyles: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  away: 'bg-yellow-100 text-yellow-700',
  offline: 'bg-gray-100 text-gray-500',
}

const statusDotStyles: Record<string, string> = {
  active: 'bg-green-400',
  away: 'bg-yellow-400',
  offline: 'bg-gray-400',
}

export default function MemberProfile() {
  const { id } = useParams<{ id: string }>()
  const [, navigate] = useLocation()

  const member = members.find(m => m.id === Number(id))

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Member not found.</p>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-indigo-600 hover:underline"
        >
          ← Back to dashboard
        </button>
      </div>
    )
  }

  const commits = member.githubUsername ? (mockCommits[member.githubUsername] ?? []) : []

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-5">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-4"
          aria-label="Back to team dashboard"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to dashboard
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Member Profile</h1>
      </header>

      <main className="max-w-3xl mx-auto px-8 py-8 space-y-6">
        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-6">
          <img
            src={member.avatarUrl}
            alt={member.name}
            className="w-24 h-24 rounded-full object-cover ring-2 ring-gray-100"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900">{member.name}</h2>
            <p className="text-gray-600 mt-0.5">{member.role}</p>
            <p className="text-sm text-gray-400">{member.department}</p>
            <span
              className={`inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[member.status]}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusDotStyles[member.status]}`} />
              <span className="capitalize">{member.status}</span>
            </span>
          </div>
          {member.githubUsername && (
            <div className="text-right shrink-0">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">GitHub</p>
              <p className="text-sm font-mono text-indigo-600">@{member.githubUsername}</p>
            </div>
          )}
        </div>

        {/* Commit history */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-800">Commit History</h3>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {commits.length} commits
            </span>
          </div>
          <CommitList commits={commits} />
        </div>
      </main>
    </div>
  )
}
