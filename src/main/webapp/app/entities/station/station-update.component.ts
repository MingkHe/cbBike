import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IStation, Station } from 'app/shared/model/station.model';
import { StationService } from './station.service';

@Component({
  selector: 'jhi-station-update',
  templateUrl: './station-update.component.html'
})
export class StationUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    sid: [],
    name: []
  });

  constructor(protected stationService: StationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ station }) => {
      this.updateForm(station);
    });
  }

  updateForm(station: IStation) {
    this.editForm.patchValue({
      id: station.id,
      sid: station.sid,
      name: station.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const station = this.createFromForm();
    if (station.id !== undefined) {
      this.subscribeToSaveResponse(this.stationService.update(station));
    } else {
      this.subscribeToSaveResponse(this.stationService.create(station));
    }
  }

  private createFromForm(): IStation {
    return {
      ...new Station(),
      id: this.editForm.get(['id']).value,
      sid: this.editForm.get(['sid']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStation>>) {
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
