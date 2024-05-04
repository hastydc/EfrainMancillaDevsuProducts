import { Toast } from '../models/toast.interface';

export const getToastByError = (error: any): Toast => {
  const toast: Toast = {
    show: true,
    error: true,
    text: 'anErrorHasOccurred',
  };

  if (error.status === 400) toast.text = 'headerAuthorIdIsMissing';

  if (error.status === 404) toast.text = 'notProductFoundWithThatId';

  if (error.status === 401) toast.text = 'youMustBeTheOwner';

  return toast;
};

export const devsuFormatDate = (source: Date): string => {
  const date = source.toISOString().split('T')[0].split('-');

  return `${date[2]}/${date[1]}/${date[0]}`;
};
