import moment from 'moment';

export const FORMAT_YYYYMMDDHHMMSS = 'YYYY-MM-DD HH:mm:ss';

export function convertDate(date: Date, format = FORMAT_YYYYMMDDHHMMSS) {
  return moment(date).format(format);
}
