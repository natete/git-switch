export interface RepositorySetting {
  id: number,
  pullRequest: {
    newOnes: boolean,
    commits: boolean,
    comments: boolean
  },
  issues: {
    newOnes: boolean,
    commits:boolean
  }
}
