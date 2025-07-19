export interface Status {
  id: string;
  name: string;
  parentId: string | null;
  order: number;
  createdAt: string;
}