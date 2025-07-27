export interface Note {
  id: number;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: Date;
  updatedAt: Date;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
