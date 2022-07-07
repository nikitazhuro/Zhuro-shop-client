/* eslint-disable no-underscore-dangle */
import { makeAutoObservable } from 'mobx';

export default class Goods {
  constructor() {
    this._goods = [];
    this._goodsCategoryPage = [];
    this._menCategories = [];
    this._womenCategories = [];
    this._activeColors = [];
    this._activeSizes = [];
    this._page = 1;
    this._limit = 5;
    this._totalCount = 0;
    makeAutoObservable(this);
  }

  get activeColors() {
    return this._activeColors;
  }

  setActiveColors(colors) {
    this._activeColors = colors;
  }

  addActiveColor(color) {
    this._activeColors.push(color);
  }

  filterActiveColors(color) {
    this._activeColors = this._activeColors.filter((e) => e !== color);
  }

  get activeSizes() {
    return this._activeSizes;
  }

  setActiveSizes(sizes) {
    this._activeSizes = sizes;
  }

  addActiveSize(size) {
    this._activeSizes.push(size);
  }

  filterActiveSizes(size) {
    this._activeSizes = this._activeSizes.filter((e) => e !== size);
  }

  setGoodsCategoryPage(good) {
    this._goodsCategoryPage = [...this._goodsCategoryPage, ...good];
  }

  setGoodsCategoryPageReplace(good) {
    this._goodsCategoryPage = good;
  }

  get goodsCategoryPage() {
    return this._goodsCategoryPage;
  }

  setGoods(good) {
    this._goods = good;
  }

  get goods() {
    return this._goods;
  }

  setMenCategories(data) {
    this._menCategories = data;
  }

  setWomenCategories(data) {
    this._womenCategories = data;
  }

  get menCategories() {
    return this._menCategories;
  }

  get womenCategories() {
    return this._womenCategories;
  }

  setPage(page) {
    this._page = page;
  }

  get page() {
    return this._page;
  }

  setLimit(limit) {
    this._limit = limit;
  }

  get limit() {
    return this._limit;
  }

  setTotalCount(totalCount) {
    this._totalCount = totalCount;
  }

  get totalCount() {
    return this._totalCount;
  }
}
