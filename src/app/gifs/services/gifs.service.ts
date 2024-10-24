import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifResponse, Meta } from '../helpers/gifs.interface';

const GIPHY_API_KEY = "EBLEDxyGhfD5zx4umd3VA5Q6pCweE15b";
const GIPHY_URL = "https://api.giphy.com/v1/gifs";

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  public gifList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

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
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    
    if (this._tagsHistory.length == 0) return;

    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string): void {

    if (tag.length > 0 && tag.length >= 3) {

      this.organizeHistory(tag);

      const params = new HttpParams()
        .set('api_key', GIPHY_API_KEY)
        .set('limit', 10)
        .set('q', tag);

      this.http.get<GifResponse>(`${GIPHY_URL}/search`, { params })
        .subscribe(respose => {
          this.gifList = respose.data;
        });

      console.log(this.gifList);
    }
  }
}
