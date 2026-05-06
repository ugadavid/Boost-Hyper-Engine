export interface ActivityMetadata {
  id: string;
  title: string;
  language: string;
  level?: string;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
  author?: string;
}
