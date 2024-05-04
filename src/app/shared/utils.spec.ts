import { devsuFormatDate, getToastByError } from './utils';
import { defaultProduct, defaultProductDates } from './utils.mock';

describe('UtilsFile', () => {
  it('getToastByError 404', () => {
    const toast = getToastByError({ status: 404 });

    expect(toast.text).toEqual('notProductFoundWithThatId');
  });

  it('getToastByError 401', () => {
    const toast = getToastByError({ status: 401 });

    expect(toast.text).toEqual('youMustBeTheOwner');
  });

  it('getToastByError 400', () => {
    const toast = getToastByError({ status: 400 });

    expect(toast.text).toEqual('headerAuthorIdIsMissing');
  });

  it('devsuFormatDate', () => {
    const date = devsuFormatDate(new Date(defaultProduct.date_release));

    expect(date).toEqual(defaultProductDates.date_release);
  });
});
