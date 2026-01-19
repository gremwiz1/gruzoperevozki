import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.locale('ru');

export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format('DD.MM.YYYY HH:mm:ss');
};

export const formatOrderJson = (json: unknown): string => {
  return JSON.stringify(json, null, 2);
};
