import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../weather-api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { mappls, mappls_plugin } from 'mappls-web-maps';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
//import {MatDialogModule} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-weathercomponent',
  templateUrl: './weathercomponent.component.html',
  styleUrls: ['./weathercomponent.component.scss'],
})
export class WeathercomponentComponent implements OnInit {
  user: any;
  userInput: string = '';

  latLongData: any;

  lat: any;
  long: any;

  visualArray: any[] = [];
mapObject:any;
markerObject:any;
  mapplsClassObject = new mappls()
  mapplsPluginObject = new mappls_plugin();

  constructor(
    private weatheapi: WeatherApiService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialogModule,
    private matd: MatDialog
  ) {}

  ngOnInit(): void {
    
    this.mapplsClassObject.initialize("afa7241708533e288b03ab099e0996b1",()=>{
      
    })
    this.spinnerMethod();
    const current_city = 'delhi';
    this.getLatLong(current_city);
  
  }

  openDialog(){
    this.matd.open(DialogExampleComponent, {
      data: {
        icon: 'Check',
        message: 'This is the Alert Dialog'
      }
    });
  }

  mapVisual(lat:any, lon:any){
    console.log("new lat long", lat, lon)
    
    this.mapObject = this.mapplsClassObject.Map({id:"map", properties: {
      center: [lat,lon],
      traffic:false,
     // zoom:5,
      geolocation: false
  
    }});
    this.markerObject = this.mapplsClassObject.Marker({
      map:this.mapObject,
      position: {lat: lat, lng: lon },
      fitbound:true,
      draggable:false,
      fitboundOptions:{
        padding:120,
        duration: 1000
      },
      width: 25,
      height:40,
      cluster:false,
      offset:[0,10],
      popupOption:{
        openPopup:true,
        autoClose:false,
        maxWidth:500
      },
    })
  }

  getWeatherImgSource(){
    const weather_condition = this.visualArray[4];
    if(weather_condition==="Clear" || weather_condition==="Sunny" ){
return "/assets/Images/sunny-cloud-weather.png";

    }else if(weather_condition === "Clouds"|| weather_condition ==="Mist" || weather_condition === "Haze" || weather_condition === "Smoke"){
      return "/assets/Images/cloudy.png"
    }else if(weather_condition === "Snow"){
      return "/assets/Images/snow_pic.png"
    }else if(weather_condition ==="Rain" || weather_condition==="Drizzle"){
      return "/assets/Images/rainy-weather.png"
    }
    else{
return "/assets/Images/sunny-cloud-weather.png"
    }
  }

  getTempImgSource(){
    const temp_condition = this.visualArray[2];
    if(temp_condition< 12){
      return "/assets/Images/cold_temp.png"
    }else{
      return "/assets/Images/hot_temp.png"
    }
  }

  getLatLong(cityName: any) {
    this.weatheapi.getLatLong(cityName).subscribe((data) => {
      if (Object.keys(data).length == 0) {
        this.spinner.hide();
        this.openDialog()
        // const current_city = 'delhi';
        // this.getLatLong(current_city);
        
      } else {
        this.visualArray = [];
        this.latLongData = data;
        this.getWeatherData(this.latLongData[0].lat, this.latLongData[0].lon);
        this.visualArray.push(this.latLongData[0].name);
        this.visualArray.push(this.latLongData[0].country);

       this.mapVisual(this.latLongData[0].lat,this.latLongData[0].lon);
       console.log("mapvisual data",this.latLongData)
      }
    });
  }

  getWeatherData(lat: any, long: any) {
    this.weatheapi.getWeatherData(lat, long).subscribe((data) => {
      this.user = data;
      this.visualArray.push((this.user.main.temp - 273.15).toFixed(2));
      this.visualArray.push(this.user.wind.speed);
      this.visualArray.push(this.user.weather[0].main);
      console.log(this.visualArray);
      console.log(this.user)
      //this.loading = false;
      this.spinner.hide();
    });
  }

  spinnerMethod() {
    this.spinner.show();
    // setTimeout(() => {
      
    //   this.spinner.hide();
    // }, 4000);
  }

  onSubmit() {
    this.spinnerMethod();
    
    // this.visualArray=[];
    this.getLatLong(this.userInput);
    this.clearInput();
  }

  clearInput() {
    this.userInput = '';
    
  }
}
