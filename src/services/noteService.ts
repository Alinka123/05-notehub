import axios from "axios";
import type { Note, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
if (!myKey) {
  throw new Error(
    "VITE_NOTEHUB_TOKEN is not defined. Please check your .env configuration."
  );
}

axios.defaults.headers.common["Authorization"] = `Bearer ${myKey}`;

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  page: number;
  perPage: number;
  data: Note[];
  total_pages: number;
}

interface RawNote {
  id: number;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

interface RawFetchNotesResponse {
  notes: RawNote[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axios.get<RawFetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
    },
  });

  const raw = response.data;

  return {
    page,
    perPage,
    data: raw.notes.map((note) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt),
    })),
    total_pages: raw.totalPages,
  };
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const response = await axios.post<RawNote>("/notes", note);
  const data = response.data;

  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await axios.delete<RawNote>(`/notes/${id}`);
  const data = response.data;

  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
};
