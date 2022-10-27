import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IResponse} from "../utils/IResponse";
import {EntityDataService} from "../utils/entity-data.service";
import {END_POINTS} from "../utils/end-points";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService  extends EntityDataService<IResponse>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.api+END_POINTS.personas.tipoPersona, );
  }
}
