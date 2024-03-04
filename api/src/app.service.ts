import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IRate } from 'models';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async convert(value: number, from: string, to: string) {
    const rate = await this.rate();

    const tos = to.split(';');
    const result: { [x: string]: number } = {};

    function _convert(to: string) {
      if (from === rate.base) {
        if (to === rate.base) {
          return value;
        } else if (rate.rates[to]) {
          return value * rate.rates[to];
        } else {
          throw `Rate for ${to} not found.`;
        }
      } else if (to === rate.base) {
        if (rate.rates[from]) {
          return value / rate.rates[from];
        } else {
          throw `Rate for ${from} not found.`;
        }
      } else {
        if (rate.rates[from] && rate.rates[to]) {
          return (value / rate.rates[from]) * rate.rates[to];
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
