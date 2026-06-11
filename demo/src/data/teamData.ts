import type { TeamMember, Commit } from '../types/team'

export const members: TeamMember[] = [
  { id: 1, name: 'Alice Chen', role: 'Engineering Manager', department: 'Engineering', status: 'active', avatarUrl: 'https://i.pravatar.cc/150?img=47', githubUsername: 'alice-chen' },
  { id: 2, name: 'Ben Torres', role: 'Senior Frontend Dev', department: 'Engineering', status: 'active', avatarUrl: 'https://i.pravatar.cc/150?img=11', githubUsername: 'ben-torres' },
  { id: 3, name: 'Clara Moss', role: 'Product Designer', department: 'Design', status: 'away', avatarUrl: 'https://i.pravatar.cc/150?img=45', githubUsername: 'clara-moss' },
  { id: 4, name: 'David Kim', role: 'Backend Engineer', department: 'Engineering', status: 'active', avatarUrl: 'https://i.pravatar.cc/150?img=14', githubUsername: 'david-kim' },
  { id: 5, name: 'Eva Novak', role: 'Data Analyst', department: 'Analytics', status: 'offline', avatarUrl: 'https://i.pravatar.cc/150?img=48', githubUsername: 'eva-novak' },
  { id: 6, name: 'Frank Osei', role: 'DevOps Engineer', department: 'Infrastructure', status: 'active', avatarUrl: 'https://i.pravatar.cc/150?img=15', githubUsername: 'frank-osei' },
  { id: 7, name: 'Grace Li', role: 'Product Manager', department: 'Product', status: 'away', avatarUrl: 'https://i.pravatar.cc/150?img=44', githubUsername: 'grace-li' },
  { id: 8, name: 'Hugo Reyes', role: 'QA Engineer', department: 'Engineering', status: 'offline', avatarUrl: 'https://i.pravatar.cc/150?img=18', githubUsername: 'hugo-reyes' },
]

export const mockCommits: Record<string, Commit[]> = {
  'alice-chen': [
    { sha: 'a1b2c3d', message: 'Merge PR #42: team dashboard layout', date: '2 hours ago' },
    { sha: 'e4f5g6h', message: 'Fix responsive grid on mobile', date: '5 hours ago' },
    { sha: 'i7j8k9l', message: 'Add status badge component', date: '1 day ago' },
    { sha: 'm1n2o3p', message: 'Refactor header styles', date: '2 days ago' },
    { sha: 'q4r5s6t', message: 'Update README with setup steps', date: '3 days ago' },
    { sha: 'u7v8w9x', message: 'Initial project scaffold', date: '4 days ago' },
  ],
  'ben-torres': [
    { sha: 'b1c2d3e', message: 'Add accordion to TeamCard', date: '1 hour ago' },
    { sha: 'f4g5h6i', message: 'Migrate to Tailwind v4', date: '3 hours ago' },
    { sha: 'j7k8l9m', message: 'Fix chevron animation on expand', date: '6 hours ago' },
    { sha: 'n1o2p3q', message: 'Upgrade React to v19', date: '1 day ago' },
    { sha: 'r4s5t6u', message: 'Remove unused imports', date: '2 days ago' },
    { sha: 'v7w8x9y', message: 'Set up Vite config', date: '3 days ago' },
  ],
  'clara-moss': [
    { sha: 'c1d2e3f', message: 'Update design tokens for dark mode', date: '4 hours ago' },
    { sha: 'g4h5i6j', message: 'Add avatar placeholder assets', date: '8 hours ago' },
    { sha: 'k7l8m9n', message: 'Revise card spacing per Figma', date: '1 day ago' },
    { sha: 'o1p2q3r', message: 'Export new icon set', date: '2 days ago' },
    { sha: 's4t5u6v', message: 'Standardize border-radius values', date: '3 days ago' },
    { sha: 'w7x8y9z', message: 'Add hero illustration', date: '5 days ago' },
  ],
  'david-kim': [
    { sha: 'd1e2f3g', message: 'Add /users endpoint with pagination', date: '2 hours ago' },
    { sha: 'h4i5j6k', message: 'Optimise DB query for team lookup', date: '6 hours ago' },
    { sha: 'l7m8n9o', message: 'Add JWT refresh token logic', date: '1 day ago' },
    { sha: 'p1q2r3s', message: 'Fix race condition in auth middleware', date: '2 days ago' },
    { sha: 't4u5v6w', message: 'Write unit tests for user service', date: '3 days ago' },
    { sha: 'x7y8z9a', message: 'Bump Go version to 1.22', date: '4 days ago' },
  ],
  'eva-novak': [
    { sha: 'e1f2g3h', message: 'Add retention cohort chart', date: '3 hours ago' },
    { sha: 'i4j5k6l', message: 'Fix null handling in CSV parser', date: '7 hours ago' },
    { sha: 'm7n8o9p', message: 'Notebook: monthly active users', date: '1 day ago' },
    { sha: 'q1r2s3t', message: 'Update dashboard KPI definitions', date: '2 days ago' },
    { sha: 'u4v5w6x', message: 'Add data pipeline for events table', date: '3 days ago' },
    { sha: 'y7z8a9b', message: 'Clean up stale dbt models', date: '5 days ago' },
  ],
  'frank-osei': [
    { sha: 'f1g2h3i', message: 'Add ECS task definition for api', date: '1 hour ago' },
    { sha: 'j4k5l6m', message: 'Fix Terraform state lock issue', date: '4 hours ago' },
    { sha: 'n7o8p9q', message: 'Rotate RDS credentials in Secrets Manager', date: '1 day ago' },
    { sha: 'r1s2t3u', message: 'Set up GitHub Actions CI pipeline', date: '2 days ago' },
    { sha: 'v4w5x6y', message: 'Add CloudWatch alarms for p99 latency', date: '3 days ago' },
    { sha: 'z7a8b9c', message: 'Upgrade Kubernetes to 1.30', date: '4 days ago' },
  ],
  'grace-li': [
    { sha: 'g1h2i3j', message: 'Write Q3 roadmap spec', date: '2 hours ago' },
    { sha: 'k4l5m6n', message: 'Update acceptance criteria for auth epic', date: '5 hours ago' },
    { sha: 'o7p8q9r', message: 'Add user story: commit history view', date: '1 day ago' },
    { sha: 's1t2u3v', message: 'Prioritise backlog for sprint 24', date: '2 days ago' },
    { sha: 'w4x5y6z', message: 'Link Figma designs to tickets', date: '3 days ago' },
    { sha: 'a7b8c9d', message: 'Close out sprint 23 retro notes', date: '4 days ago' },
  ],
  'hugo-reyes': [
    { sha: 'h1i2j3k', message: 'Add e2e test for accordion expand', date: '3 hours ago' },
    { sha: 'l4m5n6o', message: 'Fix flaky login test on CI', date: '6 hours ago' },
    { sha: 'p7q8r9s', message: 'Write smoke tests for /api/users', date: '1 day ago' },
    { sha: 't1u2v3w', message: 'Increase test coverage to 85%', date: '2 days ago' },
    { sha: 'x4y5z6a', message: 'Add accessibility checks to test suite', date: '3 days ago' },
    { sha: 'b7c8d9e', message: 'Set up Playwright config', date: '5 days ago' },
  ],
}
