import moment from 'moment';

export const FORMAT_YYYYMMDDHHMMSS = 'YYYY-MM-DD HH:mm:ss';
export const FORMAT_YYYYMMDDHHMM = 'YYYY-MM-DD HH:mm';
export const FORMAT_YYYYMMDD = 'YYYY-MM-DD';

export function convertDate(date: Date, format = FORMAT_YYYYMMDDHHMMSS) {
  return moment(date).format(format);
}
