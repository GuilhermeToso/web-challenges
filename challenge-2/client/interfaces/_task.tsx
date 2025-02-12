export interface TaskInputInterface {
  title: string;
  content: string;
}

export interface TaskInterface extends TaskInputInterface {
  id: string;
  created_at: string;
}
