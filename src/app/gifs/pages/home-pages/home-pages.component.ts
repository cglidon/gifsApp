import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../Interfaces/gifs.interfaces';

@Component({
  selector: 'app-home-pages',
  templateUrl: './home-pages.component.html',
  styleUrl: './home-pages.component.scss'
})
export class HomePagesComponent {


  constructor(private gifsServices:GifsService){}



  get gifs():Gif[]{
    
    
    return this.gifsServices.gifsList;
  }

}
