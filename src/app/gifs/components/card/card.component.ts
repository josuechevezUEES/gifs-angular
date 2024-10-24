import { Gif } from './../../helpers/gifs.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gif-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
  
export class CardComponent implements OnInit {

  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if (!this.gif) throw new Error('GIF property is required');
  }
}
