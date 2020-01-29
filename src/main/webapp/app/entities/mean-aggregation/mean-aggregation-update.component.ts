import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMean_aggregation, Mean_aggregation } from 'app/shared/model/mean-aggregation.model';
import { Mean_aggregationService } from './mean-aggregation.service';

@Component({
  selector: 'jhi-mean-aggregation-update',
  templateUrl: './mean-aggregation-update.component.html'
})
export class Mean_aggregationUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    stationID: [],
    isWeekday: [],
    minute: [],
    delta: []
  });

  constructor(
    protected mean_aggregationService: Mean_aggregationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mean_aggregation }) => {
      this.updateForm(mean_aggregation);
    });
  }

  updateForm(mean_aggregation: IMean_aggregation) {
    this.editForm.patchValue({
      id: mean_aggregation.id,
      stationID: mean_aggregation.stationID,
      isWeekday: mean_aggregation.isWeekday,
      minute: mean_aggregation.minute,
      delta: mean_aggregation.delta
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mean_aggregation = this.createFromForm();
    if (mean_aggregation.id !== undefined) {
      this.subscribeToSaveResponse(this.mean_aggregationService.update(mean_aggregation));
    } else {
      this.subscribeToSaveResponse(this.mean_aggregationService.create(mean_aggregation));
    }
  }

  private createFromForm(): IMean_aggregation {
    return {
      ...new Mean_aggregation(),
      id: this.editForm.get(['id']).value,
      stationID: this.editForm.get(['stationID']).value,
      isWeekday: this.editForm.get(['isWeekday']).value,
      minute: this.editForm.get(['minute']).value,
      delta: this.editForm.get(['delta']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMean_aggregation>>) {
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
