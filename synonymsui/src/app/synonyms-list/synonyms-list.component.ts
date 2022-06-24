import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { word } from "../models/word.model";
import { SynonymsService } from "../services/synonyms.service";

@Component({
  selector: "app-synonyms-list",
  templateUrl: "./synonyms-list.component.html",
  styleUrls: ["./synonyms-list.component.scss"],
})
export class SynonymsListComponent implements OnInit {
  @Input() list: word[] | null | undefined;
  @Input() searchTerm: string = "";
  loading: boolean = false;

  constructor(private synonymsService: SynonymsService) {}

  ngOnInit(): void {
    this.synonymsService.synonymsLoading$
      .pipe(
        tap((isLoading) => {
          this.loading = isLoading;
        })
      )
      .subscribe();
  }
}
