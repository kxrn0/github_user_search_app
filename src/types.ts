export type Theme = "light" | "dark";
export type GithubUser = {
  name: string;
  login: string;
  created_at: string;
  bio?: string;
  public_repos: number;
  followers: number;
  following: number;
  location?: string;
  twitter_username?: string;
  blog?: string;
  company?: string;
  avatar_url: string;
};
