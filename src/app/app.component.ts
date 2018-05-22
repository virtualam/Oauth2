import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private clientId: string = '240635228849-lse7s97utmvpvpfmlpjc0gb120uggluk.apps.googleusercontent.com';
  private clientSecret: string = 'i2qY8jAnIyoxIwIA8qhm6HvH';
  authCode: string = '';
  redirect_uri : string = 'http://localhost:4200/callback'

  constructor(private route: ActivatedRoute,
    private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.authCode = this.route.snapshot.queryParams['code'];
    //console.log(this.route.snapshot);
    this.route.queryParams.subscribe(
      (params: Params) => {
        console.log(params['code']);
        this.authCode = params['code'];
      }
    );
  }
  title = 'app';

  OnPostAuthCodeAndGetAccessToken() {

    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
      });

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Accept': 'application/json',
    //     'Access-Control-Allow-Origin': '*'
    //   })
    // };

    this.httpClient.post('https://www.googleapis.com/oauth2/v4/token',
      'client_id='+ this.clientId +'&client_secret=' + this.clientSecret +'&code='+ this.authCode +'&redirect_uri=http://localhost:4200/callback&grant_type=authorization_code',
      { headers: headers },
    ).subscribe(
      (response: any) => {
        console.log(response); 
      }
    );
  }
}
