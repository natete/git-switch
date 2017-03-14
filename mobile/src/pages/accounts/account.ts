export interface Account {
  id: number;
  type: string,
  name: string,
  avatar: string,
  numOfRepos: number,
  company?: string
}