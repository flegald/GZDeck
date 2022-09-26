export const checkSettings = (obj: any): boolean => {
  let valid = true;
  if (obj.previousRun) {
    if (obj.previousRun.mods && obj.previousRun.mods.length) {
      obj.previousRun.mods.forEach((m: any) => {
        if (typeof m.name !== 'string') {
          valid = false
        }
        if (typeof m.path !== "string") {
          valid = false
        }
      })
    }
    if (obj.previousRun.iwad) {
      if (typeof obj.previousRun.iwad !== 'string') {
        valid = false
      }
    }
  }
  return valid;
}
