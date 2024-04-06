export interface ChatType {
  role: "user" | "system";
  content: string;
  grammar?: string;
  words?: WordType[];
}

export interface WordType {
  word: string;
  meaning: string;
}
