import { format, getTime, parse, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = date
    .toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(',', ' |');

  return formattedDate;
}

export function formatDateDegree(dateString: string): string {
  const parts = dateString.split('/');
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

export function fCustomFormatDate(date: InputValue) {
  if (!date) return '';
  const parsedDate = parse(date.toString(), 'MMM dd yyyy hh:mma', new Date());
  return format(parsedDate, "'Ngày' dd 'tháng' MM 'năm' yyyy");
}
