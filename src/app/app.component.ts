import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

    // if (!navigator.geolocation) {
    //   console.log('location is not supported');
    // }

    // this.getLocations()

  }

  getLocations() {
    this.getPosition().then(pos => {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    });

  }

  getCurrentLocation() {

    console.log('navigator')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        console.log(position.coords.latitude)
        console.log(position.coords.longitude);
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  getPosition(): Promise<any> {
    console.log('called')
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          console.log('error', err)
          reject(err);
        });
    });

  }
}

