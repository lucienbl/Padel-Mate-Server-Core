import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalizationService {
  private _languages: any = {};

  constructor() {
    this._languages['en'] = require('./languages/en.json');
    this._languages['fr'] = require('./languages/fr.json');
  }

  private _fallback(key: string) {
    if (this._languages['en']) {
      if (this._languages['en'][key]) {
        return this._languages['en'][key];
      }
    }
    return key;
  }

  getString(key: string, locale: string, args?: any) {
    let string = this._fallback(key);

    if (this._languages[locale]) {
      if (this._languages[locale][key]) {
        string = this._languages[locale][key];
      }
    }

    const placeholderRegex = /(%{[\d|\w]+})/;

    return string
      .split(placeholderRegex)
      .filter((textPart) => !!textPart)
      .map((textPart) => {
        if (textPart.match(placeholderRegex)) {
          return args[textPart.slice(2, -1)];
        }
        return textPart;
      })
      .join('');
  }
}
