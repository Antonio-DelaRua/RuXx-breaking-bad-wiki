import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';
import { Personaje } from 'src/app/interfaces/personaje';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
   personajes: Personaje[] | undefined;
   personajesCopy: Personaje[] | undefined;


  constructor( public http: HttpClient) {

    this.getData();
   }

   async getData(){
    await this.http.get<any>(environment.apiUrl + '/characters')
    .subscribe((res) => {
      this.personajes = res.map(({char_id, name, img, status, occupation, nickname }: Personaje) =>{
        return{
          char_id: char_id,
          name: name,
          img: img,
          status: status,
          occupation: occupation,
          nickname: nickname
        };
      });

      this.personajesCopy = this.personajes;
    });
   }

  ngOnInit(): void {
  }

  filter(e:any){
    const search: string = e.target.value;
   this.personajes = this.personajesCopy?.filter(({ name }:Personaje) => {
    return name.toLowerCase().includes(search.toLowerCase());

   });
  }

}
