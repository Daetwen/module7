import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
@Pipe({
  name: 'mycurrency',
})
export class PricePipe implements PipeTransform {
  transform(
    value: number,
    currencyCode: string = 'USD',
    display: 'symbol'
      | 'symbol-narrow'
      | boolean = 'symbol-narrow',
    digitsInfo: string = '3.2-2',
    locale: string = 'fr',
  ): string | null {
    return formatCurrency(
      value,
      locale,
      getCurrencySymbol(currencyCode, 'wide'),
      currencyCode,
      digitsInfo,
    );
  }
}
