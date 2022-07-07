/* eslint-disable no-underscore-dangle */
import { makeAutoObservable } from 'mobx';

export default class Filter {
  constructor() {
    this._search = '';
    this._sex = '';
    makeAutoObservable(this);
  }

  get search() {
    return this._search;
  }

  setSearch(search) {
    this._search = search;
  }

  get sex() {
    return this._sex;
  }

  setSex(sex) {
    this._sex = sex;
  }
}
