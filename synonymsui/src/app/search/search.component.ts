import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('inOutAnimation', [
        transition(':enter', [
            style({ width: 0 }),
            animate(
                '0.3s ease-out',
                style({ width: '80px' })
            ),
        ]),
        transition(':leave', [
            style({ width: '80px' }),
            animate('0.3s ease-in', style({ width: 0 })),
        ]),
    ]),
],
})

export class SearchComponent {
  @Output() searchTermChange = new EventEmitter<string>()
  searchTerm = new FormControl('')
  isButtonClicked = false
  constructor() { }

  handleSearchTerm(){
    this.isButtonClicked = true
    this.searchTermChange.emit(this.searchTerm.value)
  }

  clearInput(){
    this.searchTerm.reset()
    this.isButtonClicked = false
    this.searchTermChange.emit(this.searchTerm.value)
  }
}
