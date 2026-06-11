export interface TeamMember {
  id: number
  name: string
  role: string
  department: string
  status: 'active' | 'away' | 'offline'
  avatarUrl: string
  githubUsername?: string
}

export interface Commit {
  sha: string
  message: string
  date: string
}
