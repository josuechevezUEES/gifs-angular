import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const GIPHY_API_KEY = "EBLEDxyGhfD5zx4umd3VA5Q6pCweE15b";
const GIPHY_URL = "https://api.giphy.com/v1/gifs";

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor(private http: HttpClient) { }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  searchTag(tag: string): void {

    if (tag.length > 0 && tag.length >= 3) {

      this.organizeHistory(tag);

      const params = new HttpParams()
        .set('api_key', GIPHY_API_KEY)
        .set('limit', 10)
        .set('q', tag);

      this.http.get(`${GIPHY_URL}/search`, { params })
        .subscribe(respose => respose);

      console.log(this._tagsHistory);
    }
  }
}
