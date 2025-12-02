import type { GithubUser } from "@/types";

export default async function get_user(userName: string): Promise<GithubUser> {
  const response = await fetch(`https://api.github.com/users/${userName}`);

  if (!response.ok) throw new Error(`Failed to fetch user! status: ${response.status}`);

  return await response.json();
}
