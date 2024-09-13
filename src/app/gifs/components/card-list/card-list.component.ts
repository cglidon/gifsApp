import { Component, Input } from '@angular/core';
import { Gif } from '../../Interfaces/gifs.interfaces';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  @Input() public gifs:Gif[]=[]
}
