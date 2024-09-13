import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent implements OnInit {
  @ViewChild('txtTagInput') tagInput?:ElementRef<HTMLInputElement>;
   
  constructor(private gifsService: GifsService){
  }
  
  
  ngOnInit(): void {
    
  }



  // searchtag(newTag:string){
  //   console.log(newTag);
  // }
  searchtag(){
    const newTag = this.tagInput?.nativeElement.value;
    this.gifsService.searchTag(newTag!);
    this.tagInput!.nativeElement.value='';
  }

}
