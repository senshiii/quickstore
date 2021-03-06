import { createContext, FC, ReactElement, useCallback, useState } from "react";
import { AppFile, Folder } from "../types";

interface UserDataContextVariables {
  files: Array<AppFile>;
  folders: Array<Folder>;
  addFile: (file: AppFile) => void;
  addFolder: (folder: Folder) => void;
  removeFile: (file: AppFile) => void;
  removeFolder: (folder: Folder) => void;
  setFiles: (files: AppFile[]) => void;
  setFolders: (folders: Folder[]) => void;
  updateFolder: (folder: Folder) => void;
  updateFile: (file: AppFile) => void;
}

export const UserDataContext = createContext<UserDataContextVariables>({
  folders: [],
  files: [],
  addFile: (file) => {},
  addFolder: (folder) => {},
  removeFolder: (folder) => {},
  removeFile: (file) => {},
  setFiles: (files) => {},
  setFolders: (folders) => {},
  updateFolder: (folder) => {},
  updateFile: (file) => {},
});

const UserDataContextProvider: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [files, setFiles] = useState<Array<AppFile>>([]);
  const [folders, setFolders] = useState<Array<Folder>>([]);

  const addFolder = useCallback(
    (newFolder: Folder) => {
      setFolders([...folders, newFolder]);
    },
    [folders]
  );

  const removeFolder = useCallback(
    (targetFolder: Folder) => {
      setFolders(folders.filter((folder) => folder.id !== targetFolder.id));
    },
    [folders]
  );

  const updateFolder = useCallback(
    (targetFolder: Folder) => {
      setFolders(
        folders.map((f) => (f.id == targetFolder.id ? targetFolder : f))
      );
    },
    [folders]
  );

  const updateFile = useCallback(
    (targetFile: AppFile) => {
      setFiles(files.map((f) => (f.id == targetFile.id ? targetFile : f)));
    },
    [files]
  );

  const addFile = useCallback(
    (newFile: AppFile) => {
      setFiles([newFile, ...files]);
    },
    [files]
  );

  const removeFile = useCallback(
    (targetFile: AppFile) => {
      setFiles(files.filter((file) => file.id !== targetFile.id));
    },
    [files]
  );

  return (
    <UserDataContext.Provider
      value={{
        files,
        folders,
        setFiles,
        addFile,
        updateFile,
        removeFile,
        setFolders,
        addFolder,
        updateFolder,
        removeFolder,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
