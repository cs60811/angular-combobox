import { Component } from '@angular/core';
import { map, tap, distinct , catchError , filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of, from , Observable  } from 'rxjs'



import { products } from '../products';
//import { PlaceService } from '../Service/place.service';

interface PlaceMap {
  ID: string;
  Place: string;
  Date: Date;
  Time: string;
  Owner: string;
  Max: number;
  Accept: string;
  CreateDate: Date;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})



export class ProductListComponent {
  // 外層使用
  selectPlace = 'Place';
  selectDate = null;
  //********* */
  products = products;

  httpClient: any;
  data: any;
  PlaceList: any;
  errorMessage: any;
  Place: any = [];
  PlaceDate: any =[];
  DateOfPlace: any = [] ;

  constructor(
    private http: HttpClient , 
    //private PlaceService: PlaceService
    ) {
  }

ngOnInit() {
  /*const Paramater = '?PID=Place&AID=GetPlaceMap';
  const PlaceListURL = 'https://script.google.com/macros/s/AKfycbwC3XKfgUHRy_NbBHMwfrEwALyAwLKAciPeg5k775uIIjf4SG0x/exec' + Paramater;
    this.PlaceList = this.http.post<any>(PlaceListURL , null , {}).subscribe(
      data => {
        return from<any>(JSON.parse(data)).pipe(
          distinct((p: any)=> p['Place'],)
        ).subscribe(p => console.log(p));

      }
    )*/
  this.getPlaceMap();
}

updateDateOfPlace(selectedValue): void {
  this.DateOfPlace = [];
  console.log("點選的值:"+selectedValue);
  this.getPlaceMaps().pipe(
     map(
        data =>JSON.parse(data.toString())
     ),
      map(
        item => {
           from<any[]>(item).pipe(
              filter((p: any)=> p['Place'] == selectedValue,),
              //tap ( data => console.log("123:"+data.Date))
            ).subscribe( item => {
              this.DateOfPlace.push(item);
              //console.log("qq:"+item.Date);
            });

        }
      )
  ).subscribe();
}
/*
getDateOfPlace( Place: any ): void {
  console.log(Place);

  this.getPlaceMaps().pipe(
     map(
        data =>JSON.parse(data.toString())
     ),
     filter(
        data => data['Place'] == Place
     )
  ).subscribe( item => {
      this.PlaceDate.push(item);
      console.log(item);
  });
}*/

getPlaceMap(): void {
    this.getPlaceMaps().pipe(
    //this.PlaceService.getPlaceMaps().pipe(
      map(
        data =>JSON.parse(data.toString())
      ),
      map(
        item => {
           from<any[]>(item).pipe(
              distinct((p: any)=> p['Place'],),
              //tap ( data => console.log("123:"+data))
            ).subscribe( item => {
              this.Place.push(item);
            
              
            });

        }
      )
    ).subscribe(
      /*item => {
        console.log('最後Item型態:'+item);
      }*/
    )
  }


getPlaceMaps (): Observable<PlaceMap[]> {
  const Paramater = '?PID=Place&AID=GetPlaceMap';
  const PlaceListURL = 'https://script.google.com/macros/s/AKfycbwC3XKfgUHRy_NbBHMwfrEwALyAwLKAciPeg5k775uIIjf4SG0x/exec' + Paramater;
    return this.http.get<PlaceMap[]>(PlaceListURL).pipe(
        tap(_ => console.log('fetched Places')),
        catchError(this.handleError<PlaceMap[]>('getPlaceMaps', []))
      );
}

/*getPlaceMaps (): Observable<PlaceMap[]> {
  const Paramater = '?PID=Place&AID=GetPlaceMap';
  const PlaceListURL = 'https://script.google.com/macros/s/AKfycbwC3XKfgUHRy_NbBHMwfrEwALyAwLKAciPeg5k775uIIjf4SG0x/exec' + Paramater;
    return this.http.post<PlaceMap[]>(PlaceListURL,null).pipe(
        map(item => JSON.parse(item)),
        tap(_ => console.log('fetched Places')),
        catchError(this.handleError<PlaceMap[]>('getPlaceMaps', []))
      );
  }*/


/*getPlaceMaps (): Observable<any> {
  const Paramater = '?PID=Place&AID=GetPlaceMap';
  const PlaceListURL = 'https://script.google.com/macros/s/AKfycbwC3XKfgUHRy_NbBHMwfrEwALyAwLKAciPeg5k775uIIjf4SG0x/exec' + Paramater;
    return this.http.post(PlaceListURL,null,{}).pipe(
        map(res => res),
        tap(_ => console.log(_))
      );
  }*/

share() {
   window.alert('The product has been shared!');
}

private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/