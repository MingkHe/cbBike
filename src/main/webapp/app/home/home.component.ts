import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';
import {Station} from "app/shared/model/station.model";
import { Observable } from 'rxjs';
import {BikeDelta} from "app/shared/model/bike-delta.model";

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account;
  authSubscription: Subscription;
  modalRef: NgbModalRef;

  resultStation: Station;
  stationName: string;
  stationId: number;
  departureTime: number;
  arriveTime: number;
  weekday: boolean;
  delta: number;
  resultBikeArrive: BikeDelta;
  resultBikeDeparture: BikeDelta;

  private getStationIdAddressUrl = SERVER_API_URL + '/api/stationsIdByName';
  private getDeltaAddressUrl = SERVER_API_URL + '/api/bike-deltas';

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.accountService.identity().subscribe((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
  }

  registerAuthenticationSuccess() {
    this.authSubscription = this.eventManager.subscribe('authenticationSuccess', () => {
      this.accountService.identity().subscribe(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.eventManager.destroy(this.authSubscription);
    }
  }

  getSid() {
    this.getStationId(this.stationName).subscribe(staDto => {
      if (!staDto) {
        this.resultStation = null;
      } else {
        this.resultStation = staDto;
      }
    });
  }


  getStationId(name : String) : Observable<Station> {
    return this.http.get<Station>(`${this.getStationIdAddressUrl}/${name}`);
  }

  getBikeDelta() {
    this.getSid();

    this.getDelta(this.resultStation.sid, this.departureTime, this.weekday).subscribe(bike1Dto => {
      if (!bike1Dto) {
        this.resultBikeDeparture = null;
      } else {
        this.resultBikeDeparture = bike1Dto;
      }
    });

    this.getDelta(this.resultStation.sid, this.arriveTime, this.weekday).subscribe(bikeDto => {
      if (!bikeDto) {
        this.resultBikeArrive = null;
      } else {
        this.resultBikeArrive = bikeDto;
      }
    });

    this.delta = this.resultBikeArrive.deltaValue - this.resultBikeDeparture.deltaValue;
  }

  getDelta(sid : number, minute: number, weekday: boolean) : Observable<BikeDelta>{
    return this.http.get<BikeDelta>(`${this.getDeltaAddressUrl}/${sid}/${minute}/${weekday}`);
  }
}
