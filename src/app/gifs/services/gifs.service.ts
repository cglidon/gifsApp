import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../Interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})

export class GifsService {
  
  public gifsList:Gif[]=[]

  private _tagsHistory:  string[] = [];
  private apiKey:        string="eFr08V3MnQt6kvCINyRTuq1tVfTtZOIk";
  private serviceUrl:    string ='https://api.giphy.com/v1/gifs'
  
  constructor(private http:HttpClient) { 
    this.loadLocalStorage();
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string){
    // Pasar el tag a lowerCase
    tag = tag.toLowerCase();
    // Si el valor del array ya incluye contiene el tag.
    if(this._tagsHistory.includes(tag)){
      // filtramos para buscar el tag que ya se ha escrito.
      this._tagsHistory = this._tagsHistory.filter((oldTag)=>oldTag !== tag)
    }
    // Agregamos el tag al principio
    this._tagsHistory.unshift(tag);
    // Solamente mostramos 10 tags
    this._tagsHistory = this.tagsHistory.splice(0,10)
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
  
    if(!localStorage.getItem('history')) return;
    this._tagsHistory= JSON.parse( localStorage.getItem('history')! );
    
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0])
    
  }


  searchTag( tag: string):void{
    // Si pulsa muchas veces Enter y no ha escrito nada no agrega el tag
    if(tag.length === 0 )return;
    this.organizeHistory(tag);
  
    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('q', tag)
      .set('limit','10')
      
    
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe((resp)=>{
        this.gifsList=resp.data;
        console.log(this.gifsList);  
    })
  }




}



// fetch('https://api.giphy.com/v1/gifs/search?api_key=9hjJeGUen2y0O3PZ6GcYgnm0HDCwY0cz&q=onepunch&limit=10')
    //   .then(resp=>resp.json())
    //   .then(data=> console.log(data))