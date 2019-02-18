import { Component} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gridData: Array<any> = [];
  val :Array<any> = [];
  tempGridData: Array<any> = [];
  chipsData:Array<any> = [];
  sortReverse: boolean = false;
  isbelowTwentyClicked:boolean = false;
  isFourtyToSixtyClicked:boolean = false;
  isTwentyToFourtyClicked:boolean = false;
  isaboveSixtyClicked:boolean = false;
  count:any;
  constructor(private http: Http){}

  ngOnInit(){
    this.http.get('./assets/table.json')
            .map((response: Response) => response.json())
            .subscribe(data => {
                this.gridData = data;
                this.tempGridData = this.gridData.slice();
            });

    setTimeout(() =>{
      this.filterAgeData(this.gridData);
      this.sortData('desc');
    })
  }

  filterAgeData(mock){
    this.count = {
        belowTwenty: 0,
        twentyToFourty:0,
        fourtyToSixty:0,
        aboveSixty:0
    };
    for(let value of mock){
      if(value.age < 20){
        this.count.belowTwenty = this.count.belowTwenty + 1;
      } else if(value.age >= 20 && value.age < 40){
        this.count.twentyToFourty = this.count.twentyToFourty + 1;
      } else if(value.age >= 40 && value.age <= 60){
        this.count.fourtyToSixty = this.count.fourtyToSixty + 1;   
      } else{
        this.count.aboveSixty = this.count.aboveSixty + 1;
      }
    }
  }
  removeChip(index,chipVal){
    this.isFilterClicked({},chipVal);
    this.chipsData.splice(index,0);
    if(this.chipsData.length == 0){
      this.gridData = this.tempGridData;
    }
  }

  
isFilterClicked(eve,filterVal){
  this.val = [];
  if(filterVal == '20'){
    this.isbelowTwentyClicked = !this.isbelowTwentyClicked;
    if(!this.isbelowTwentyClicked){ 
      this.chipsData.splice( this.chipsData.indexOf('20'), 1 );
    } else{
      this.chipsData.push(filterVal);
    }
  } else if(filterVal == '20-40'){
    this.isTwentyToFourtyClicked = !this.isTwentyToFourtyClicked;
    if(!this.isTwentyToFourtyClicked){ 
      this.chipsData.splice( this.chipsData.indexOf('20-40'), 1 );
    } else{
      this.chipsData.push(filterVal);
    }
  } else if(filterVal == '40-60'){
    this.isFourtyToSixtyClicked = !this.isFourtyToSixtyClicked;
    if(!this.isFourtyToSixtyClicked){ 
      this.chipsData.splice( this.chipsData.indexOf('40-60'), 1 );
    } else{
      this.chipsData.push(filterVal);
    }
  } else if(filterVal == '60'){
    this.isaboveSixtyClicked = !this.isaboveSixtyClicked;
    if(!this.isaboveSixtyClicked){ 
      this.chipsData.splice( this.chipsData.indexOf('60'), 1 );
    } else{
      this.chipsData.push(filterVal);
    }
  }
  let arr = this.gridData.slice();
  for(let i=0;i<this.chipsData.length;i++){
    arr = this.tempGridData.slice();
    this.filterData(arr,this.chipsData[i]);
  }
    this.gridData = this.val;
    if(this.chipsData.length == 0){
      this.gridData = this.tempGridData;
    }

    this.sortData('desc');
}

filterData(arr,val){
  for(let i=0;i<arr.length;i++){
    if(val == '20'){
      if(arr[i].age < 20){
        if(this.isbelowTwentyClicked){
          this.val.push(arr[i]);
        }
      }
    } else if(val == '20-40'){
      if(this.isTwentyToFourtyClicked){
        if(arr[i].age >= 20 && arr[i].age < 40){
          this.val.push(arr[i]);
        }
      }
      
    } else if(val == '40-60'){
      if(this.isFourtyToSixtyClicked){
        if(arr[i].age >= 40 && arr[i].age <= 60){
          this.val.push(arr[i]);
        }
      }
      
    } else if(val == '60'){
      if(this.isaboveSixtyClicked){
        if(arr[i].age > 60){
          this.val.push(arr[i]);
        }
      }
     }
    
  }
}



sortData(order ?: any){
  this.sortReverse = !this.sortReverse;
  if(!this.sortReverse && order){
    this.gridData.sort((a, b) => {
      if (a.age < b.age) return -1;
      else if (a.age > b.age) return 1;
      else return 0;
    });
  } else if(this.sortReverse && order){
    this.gridData.sort((a, b) => {
      if (a.age > b.age) return -1;
      else if (a.age < b.age) return 1;
      else return 0;
    });
  }
}

chipDisplayValue(val){
  if(val == '20'){
    return 'below 20Yrs'
  } else if(val == '20-40'){
    return '20 to 40Yrs'
  } else if(val == '40-60'){
    return '40 to 60yrs'
  } else if( val == '60'){
    return 'above 60yrs'
  }
}
}