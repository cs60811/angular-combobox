import { Component , OnInit,  Pipe, PipeTransform } from '@angular/core';
import { map, tap, distinct } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of, from } from 'rxjs'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  httpClient: any;
  data: any;
  PlaceList: any;
  errorMessage: any;

  constructor(private http: HttpClient) {

   }
/*
  ngOnInit() {
  const Paramater = '?PID=Place&AID=GetPlaceMap';
  const PlaceListURL = 'https://script.google.com/macros/s/AKfycbwC3XKfgUHRy_NbBHMwfrEwALyAwLKAciPeg5k775uIIjf4SG0x/exec' + Paramater;
    this.PlaceList = this.http.post<any>(PlaceListURL , null , {}).subscribe(
      data => {
        from<any>(JSON.parse(data)).pipe(
          distinct((p: any)=> p['Place'],),
          map (data => data)
        ).subscribe(p => console.log(p));
      }
    )


}*/
}


