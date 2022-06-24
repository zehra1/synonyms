import {COMMA, ENTER } from '@angular/cdk/keycodes';
import {Component } from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SynonymsService } from '../services/synonyms.service';
@Component({
  selector: 'app-synonyms-add',
  templateUrl: './synonyms-add.component.html',
  styleUrls: ['./synonyms-add.component.scss']
})
export class SynonymsAddComponent{
  separatorKeysCodes: number[] = [ENTER, COMMA];
  words: string[] = [];
  constructor(private synonymsService: SynonymsService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.words.push(value);
    }
    event.input!.value = ''
  }

  remove(word: string): void {
    const index = this.words.indexOf(word);
    if (index >= 0) {
      this.words.splice(index, 1);
    }
  }

  onSubmit(){
    this.synonymsService.addSynonym(this.words).subscribe({
      next: ()=>{
        this.dialog.closeAll()
        this._snackBar.open('Sucesfully added synonyms.', '', {duration: 5000})
      },
      error: (err)=>{
        this._snackBar.open(err.error.message, '', {duration: 5000})
      }
    });
  }
}
