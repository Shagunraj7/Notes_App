export interface Folder {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FolderContextType {
  folders: Folder[];
  activeFolder: Folder | null;
  fetchFolders: () => void;
  isLoading: boolean;
}

export interface Note {
  id: string;
  folderId: string;
  title: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  preview: string;
  folder: Folder;
}

export interface NoteData {
  id: string;
  folderId: string;
  title: string;
  content: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  folder: Folder;
}

export interface NotesContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  fetchNotes: (params: FetchNotesParams) => Promise<void>;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FetchNotesParams {
  folderId?: string | null;
  page?: number;
  archived?: boolean;
  favorite?: boolean;
  deleted?: boolean;
  search?: string;
}