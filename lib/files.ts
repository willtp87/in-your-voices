import * as FileSystem from "expo-file-system";

// Library for file manipulation.

// Force create directory.
// Not testable: with built in mock dirInfo.isDirectory is unreliable.
export const forceCreateDir = async (dir: string) => {
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists || !dirInfo.isDirectory) {
    await FileSystem.deleteAsync(dir, { idempotent: true });
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
};
