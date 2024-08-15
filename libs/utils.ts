export const mockServerWait = (msTime: number = 1500) =>
  new Promise((resolve) => setTimeout(resolve, msTime));
