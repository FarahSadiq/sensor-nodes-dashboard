import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const endpoint =  environment.SERVER_URL;
const headers = new HttpHeaders({
  'Content-Type':  'application/json',
});

const httpOptions = {
  headers: headers,
  observe: 'response' as 'body'
};

@Injectable({
  providedIn: 'root'
})
export class ApiCalls {

  constructor(private http: HttpClient) {
  }
  public getTemperatureByNode(nodeId): Observable<any> {
    return this.http.get<any>(endpoint + 'temperatureData/' + nodeId , httpOptions).pipe();
  }
  public getHumidityByNode(nodeId): Observable<any> {
    return this.http.get<any>(endpoint + 'humiditydata/'  + nodeId , httpOptions).pipe();
  }
  public getPhByNode(nodeId): Observable<any> {
    return this.http.get<any>(endpoint + 'phdata/'  + nodeId , httpOptions).pipe();
  }
  public getTurbidityByNode(nodeId): Observable<any> {
    return this.http.get<any>(endpoint + 'turbiditydata/'  + nodeId , httpOptions).pipe();
  }
  public getPressureByNode(nodeId): Observable<any> {
    return this.http.get<any>(endpoint + 'pressuredata/'  + nodeId , httpOptions).pipe();
  }
  public getAverageHumidityByNode(nodeId, avgType): Observable<any> {
    return this.http.get<any>(endpoint + 'averagehumidity/'  + nodeId + '/' + avgType, httpOptions).pipe();
  }
  public getAveragePhByNode(nodeId, avgType): Observable<any> {
    return this.http.get<any>(endpoint + 'averageph/'  + nodeId + '/' + avgType, httpOptions).pipe();
  }
  public getAverageTurbidityByNode(nodeId, avgType): Observable<any> {
    return this.http.get<any>(endpoint + 'averageturbidity/'  + nodeId + '/' + avgType, httpOptions).pipe();
  }
  public getAveragePressureByNode(nodeId, avgType): Observable<any> {
    return this.http.get<any>(endpoint + 'averagepressure/'  + nodeId + '/' + avgType, httpOptions).pipe();
  }
  public getAverageTemperatureByNode(nodeId, avgType): Observable<any> {
    return this.http.get<any>(endpoint + 'averagetemperature/'  + nodeId + '/' + avgType, httpOptions).pipe();
  }
  public getLocationByNode(nodeId): Observable<any> {
    return this.http.get<any>(endpoint + 'latlongdata/'  + nodeId , httpOptions).pipe();
  }
  public getLightByNode(nodeId): Observable<any> {
    return this.http.get<any>(endpoint + 'lightdata/'  + nodeId , httpOptions).pipe();
  }
  public getElevationByNode(nodeId): Observable<any> {
    return this.http.get<any>(endpoint + 'elevationdata/'  + nodeId , httpOptions).pipe();
  }
  public getAirQualityByNode(nodeId): Observable<any> {
    return this.http.get<any>(endpoint + 'airqualitydata/'  + nodeId , httpOptions).pipe();
  }
  public getSoilHumidityByNode(nodeId): Observable<any> {
    return this.http.get<any>(endpoint + 'soilhumiditydata/'  + nodeId , httpOptions).pipe();
  }
  public getSmokeByNode(nodeId): Observable<any> {
    return this.http.get<any>(endpoint + 'smokedata/'  + nodeId , httpOptions).pipe();
  }
  public getRecentAlerts(): Observable<any> {
    return this.http.get<any>(endpoint + 'alertsdata'   , httpOptions).pipe();
  }
  public getHistoricalAlerts(nodeId): Observable<any> {
    return this.http.get<any>(endpoint + 'alertsdata/' + nodeId   , httpOptions).pipe();
  }
  public getLastWeekAlerts(): Observable<any> {
    return this.http.get<any>(endpoint + 'alertsforlastsevendays'  , httpOptions).pipe();
  }
}
