import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IStation_information, Station_information } from 'app/shared/model/station-information.model';
import { Station_informationService } from './station-information.service';

@Component({
  selector: 'jhi-station-information-update',
  templateUrl: './station-information-update.component.html'
})
export class Station_informationUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    station_id: [],
    external_id: [],
    name: [],
    short_name: [],
    lat: [],
    lon: [],
    region_id: [],
    rental_methods_0: [],
    rental_methods_1: [],
    capacity: [],
    rental_url: [],
    electric_bike_surcharge_waiver: [],
    eightd_has_key_dispenser: []
  });

  constructor(
    protected station_informationService: Station_informationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ station_information }) => {
      this.updateForm(station_information);
    });
  }

  updateForm(station_information: IStation_information) {
    this.editForm.patchValue({
      id: station_information.id,
      station_id: station_information.station_id,
      external_id: station_information.external_id,
      name: station_information.name,
      short_name: station_information.short_name,
      lat: station_information.lat,
      lon: station_information.lon,
      region_id: station_information.region_id,
      rental_methods_0: station_information.rental_methods_0,
      rental_methods_1: station_information.rental_methods_1,
      capacity: station_information.capacity,
      rental_url: station_information.rental_url,
      electric_bike_surcharge_waiver: station_information.electric_bike_surcharge_waiver,
      eightd_has_key_dispenser: station_information.eightd_has_key_dispenser
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const station_information = this.createFromForm();
    if (station_information.id !== undefined) {
      this.subscribeToSaveResponse(this.station_informationService.update(station_information));
    } else {
      this.subscribeToSaveResponse(this.station_informationService.create(station_information));
    }
  }

  private createFromForm(): IStation_information {
    return {
      ...new Station_information(),
      id: this.editForm.get(['id']).value,
      station_id: this.editForm.get(['station_id']).value,
      external_id: this.editForm.get(['external_id']).value,
      name: this.editForm.get(['name']).value,
      short_name: this.editForm.get(['short_name']).value,
      lat: this.editForm.get(['lat']).value,
      lon: this.editForm.get(['lon']).value,
      region_id: this.editForm.get(['region_id']).value,
      rental_methods_0: this.editForm.get(['rental_methods_0']).value,
      rental_methods_1: this.editForm.get(['rental_methods_1']).value,
      capacity: this.editForm.get(['capacity']).value,
      rental_url: this.editForm.get(['rental_url']).value,
      electric_bike_surcharge_waiver: this.editForm.get(['electric_bike_surcharge_waiver']).value,
      eightd_has_key_dispenser: this.editForm.get(['eightd_has_key_dispenser']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStation_information>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
