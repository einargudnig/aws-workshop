import type { Commit } from '../types/team'

interface CommitListProps {
  commits: Commit[]
}

export const CommitList = ({ commits }: CommitListProps) => {
  if (commits.length === 0) {
    return <p className="text-sm text-gray-400 italic">No commits found.</p>
  }

  return (
    <ul className="divide-y divide-gray-100">
      {commits.map(commit => (
        <li key={commit.sha} className="flex items-start gap-3 py-3">
          <code className="text-xs text-indigo-500 font-mono mt-0.5 shrink-0 bg-indigo-50 px-1.5 py-0.5 rounded">
            {commit.sha}
          </code>
          <p className="text-sm text-gray-700 flex-1">{commit.message}</p>
          <span className="text-xs text-gray-400 shrink-0 mt-0.5">{commit.date}</span>
        </li>
      ))}
    </ul>
  )
}
