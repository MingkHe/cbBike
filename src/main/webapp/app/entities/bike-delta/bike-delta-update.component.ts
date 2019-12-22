import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IBikeDelta, BikeDelta } from 'app/shared/model/bike-delta.model';
import { BikeDeltaService } from './bike-delta.service';

@Component({
  selector: 'jhi-bike-delta-update',
  templateUrl: './bike-delta-update.component.html'
})
export class BikeDeltaUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    stationID: [],
    minute: [],
    weekday: [],
    deltaValue: []
  });

  constructor(protected bikeDeltaService: BikeDeltaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ bikeDelta }) => {
      this.updateForm(bikeDelta);
    });
  }

  updateForm(bikeDelta: IBikeDelta) {
    this.editForm.patchValue({
      id: bikeDelta.id,
      stationID: bikeDelta.stationID,
      minute: bikeDelta.minute,
      weekday: bikeDelta.weekday,
      deltaValue: bikeDelta.deltaValue
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const bikeDelta = this.createFromForm();
    if (bikeDelta.id !== undefined) {
      this.subscribeToSaveResponse(this.bikeDeltaService.update(bikeDelta));
    } else {
      this.subscribeToSaveResponse(this.bikeDeltaService.create(bikeDelta));
    }
  }

  private createFromForm(): IBikeDelta {
    return {
      ...new BikeDelta(),
      id: this.editForm.get(['id']).value,
      stationID: this.editForm.get(['stationID']).value,
      minute: this.editForm.get(['minute']).value,
      weekday: this.editForm.get(['weekday']).value,
      deltaValue: this.editForm.get(['deltaValue']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBikeDelta>>) {
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
