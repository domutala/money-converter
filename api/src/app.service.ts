import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IRate } from 'models';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async convert(value: string, from: string, to: string) {
    if (
      typeof value !== 'string' ||
      typeof from !== 'string' ||
      typeof to !== 'string'
    ) {
      throw new HttpException('invalid data', HttpStatus.BAD_REQUEST);
    }

    const rate = await this.rate();
    const _value = Number(value);
    const tos = to.split(';');
    const result: { [x: string]: number } = {};

    function _convert(to: string) {
      if (from === rate.base) {
        if (to === rate.base) {
          return _value;
        } else if (rate.rates[to]) {
          return _value * rate.rates[to];
        } else {
          throw `Rate for ${to} not found.`;
        }
      } else if (to === rate.base) {
        if (rate.rates[from]) {
          return _value / rate.rates[from];
        } else {
          throw `Rate for ${from} not found.`;
        }
      } else {
        if (rate.rates[from] && rate.rates[to]) {
          return (_value / rate.rates[from]) * rate.rates[to];
        } else {
          throw `Rate for ${from} or ${to} not found.`;
        }
      }
    }

    for (const to of tos) result[to] = _convert(to);

    return { result, rate: await this.rate(from) };
  }

  async rate(base?: string) {
    const response = await this.httpService
      .get('https://cdn.taux.live/api/latest.json')
      .toPromise();

    const rate: IRate = response.data;
    rate.base = 'USD';

    if (base && rate.rates[base] && base !== rate.base) {
      const baseRate = rate.rates[base];

      for (const currency in rate.rates) {
        rate.rates[currency] = rate.rates[currency] / baseRate;
        rate.base = base;
      }
    }

    return rate;
  }
}
