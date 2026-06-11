import { useState } from 'react'
import { useLocation } from 'wouter'
import type { TeamMember } from '../types/team'
import { mockCommits } from '../data/teamData'

const statusStyles: Record<TeamMember['status'], string> = {
  active: 'bg-green-400',
  away: 'bg-yellow-400',
  offline: 'bg-gray-400',
}

interface TeamCardProps {
  member: TeamMember
}

export const TeamCard = ({ member }: TeamCardProps) => {
  const [open, setOpen] = useState(false)
  const [, navigate] = useLocation()
  const commits = member.githubUsername ? (mockCommits[member.githubUsername] ?? []) : []

  const handleCardClick = () => {
    navigate(`/members/${member.id}`)
  }

  const handleChevronClick = (e: React.MouseEvent) => {
    // Stop the card click from firing when toggling the accordion
    e.stopPropagation()
    setOpen(o => !o)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={e => e.key === 'Enter' && handleCardClick()}
        aria-label={`View profile for ${member.name}`}
        className="p-5 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <img
          src={member.avatarUrl}
          alt={member.name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">{member.name}</p>
          <p className="text-sm text-gray-500 truncate">{member.role}</p>
          <p className="text-xs text-gray-400 truncate">{member.department}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${statusStyles[member.status]}`} />
            <span className="text-xs capitalize text-gray-500">{member.status}</span>
          </div>
          <button
            onClick={handleChevronClick}
            aria-expanded={open}
            aria-label="Toggle recent commits"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`transition-all duration-200 overflow-hidden ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="border-t border-gray-100 px-5 py-3 bg-gray-50 space-y-2">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Recent commits</p>
          {commits.map(commit => (
            <div key={commit.sha} className="flex items-start gap-2">
              <code className="text-xs text-indigo-500 font-mono mt-0.5 shrink-0">{commit.sha}</code>
              <p className="text-xs text-gray-600 flex-1 truncate">{commit.message}</p>
              <span className="text-xs text-gray-400 shrink-0">{commit.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
