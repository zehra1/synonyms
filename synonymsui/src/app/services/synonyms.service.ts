import { Injectable } from "@angular/core";
import { EndpointURIs } from "./services.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { word } from "../models/word.model";

const routes = {
  addSynonyms: () => `${EndpointURIs.SYNONYM}`,
  searchSynonyms: (searchTerm: string) =>
    `${EndpointURIs.SYNONYM}?searchTerm=${searchTerm}`,
};
@Injectable({
  providedIn: "root",
})
export class SynonymsService {
  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    }),
  };

  private readonly _synonyms = new BehaviorSubject<word[]>([]);
  readonly synonyms$ = this._synonyms.asObservable();

  private readonly _synonymsLoading = new BehaviorSubject<boolean>(false);
  readonly synonymsLoading$ = this._synonymsLoading.asObservable();

  set synonymsLoading(value: boolean) {
    this._synonymsLoading.next(value);
  }

  get synonymsLoading() {
    return this._synonymsLoading.getValue();
  }

  set synonyms(value: word[]) {
    this._synonyms.next(value);
  }

  get synonyms() {
    return this._synonyms.getValue();
  }

  constructor(private httpClient: HttpClient) {}
  addSynonym(synonyms: string[]) {
    const words = { words: synonyms };
    return this.httpClient.post<any>(
      routes.addSynonyms(),
      words,
      this.httpOptions
    );
  }

  searchSynonyms(word: string) {
    this.synonymsLoading = true;
    this.httpClient
      .get<any>(routes.searchSynonyms(word), this.httpOptions)
      .pipe(
        catchError((err) => {
          this.synonymsLoading = false;
          return of("Something went wrong");
        }),
        tap((synonymList) => {
          this.synonymsLoading = false;
          this.synonyms = synonymList;
        })
      )
      .subscribe();
  }
}
