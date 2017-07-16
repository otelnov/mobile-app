// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// app
import { LoggerService } from '../../backend/services/custom/logger.service';
import { SpeakerService } from '../services/speaker.service';
import { SpeakerActions } from '../actions/speaker.action';
import { AppActions } from '../../ngrx';

@Injectable()
export class SpeakerEffects {

  @Effect() count$ = this.actions$
    .ofType(SpeakerActions.ActionTypes.COUNT)
    .switchMap((action) => 
      this.speakerService.count()
        .map((count) => new SpeakerActions.ChangedAction({
          count
        }))
      );

  @Effect() fetch$ = this.actions$
    .ofType(SpeakerActions.ActionTypes.FETCH)
    .switchMap((action) => 
      this.speakerService.fetch()
        .map((value) => {
          console.log(value);
          return new AppActions.NoopAction();
        })
      );

  @Effect() init$ = this.actions$
    .ofType(SpeakerActions.ActionTypes.INIT)
    .startWith(new SpeakerActions.InitAction())
    .map(action => new SpeakerActions.FetchAction());

  constructor(private store: Store<any>, private actions$: Actions, private log: LoggerService, private speakerService: SpeakerService) { }
}