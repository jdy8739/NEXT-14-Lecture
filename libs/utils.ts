export const mockServerWait = (msTime: number = 1500) =>
  new Promise((resolve) => setTimeout(resolve, msTime));

const msInOneDay = 1000 * 60 * 60 * 24;

const relativeTimeFormatter = new Intl.RelativeTimeFormat('ko');

export const formatToTimeAgo = (time: number) => {
  const timestampTimeAgo = new Date(time).getTime();

  const timestampNow = Date.now();

  const diff = Math.round((timestampTimeAgo - timestampNow) / msInOneDay);

  return relativeTimeFormatter.format(diff, 'days');
};

export const formatToWon = (price: number) => {
  return price.toLocaleString('ko-KR');
};
