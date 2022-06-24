import { Component } from '@angular/core';
import { word } from './models/word.model';
import { SynonymsService } from './services/synonyms.service';
import {MatDialog } from '@angular/material/dialog';
import { SynonymsAddComponent } from './synonyms-add/synonyms-add.component';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'synonyms';
  synonymsList$: Observable<word[]> | undefined
  searchTerm: string = ''
  showAddButton = true
  constructor(private synonymsService:SynonymsService, public dialog: MatDialog) {}

  handleSearchTermChange(searchTerm:string){
    this.searchTerm = searchTerm
    this.synonymsService.searchSynonyms(this.searchTerm)
    this.synonymsList$ = this.synonymsService.synonyms$
  }

  openDialog(): void {
    this.showAddButton = false
    const dialogRef = this.dialog.open(SynonymsAddComponent, {
      width: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.showAddButton = true
    });
  }
}
