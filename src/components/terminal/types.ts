export type FsFile = {
  type: "file";
  content: string;
};

export type FsDirectory = {
  type: "directory";
  children: Record<string, FsNode>;
};

export type FsNode = FsFile | FsDirectory;

export type HistoryEntry = {
  id: number;
  cwd: string;
  command: string;
  output: string;
};
