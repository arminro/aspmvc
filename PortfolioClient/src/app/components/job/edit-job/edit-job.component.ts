import { PigeonService } from './../../../services/pigeon.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';
import { AuthService } from 'src/app/services/auth.service';
import { JobcomponentBase } from '../jobcomponent-base';
import { Job } from 'src/app/viewmodels/job-model';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent extends JobcomponentBase implements OnInit {

  constructor(public router: Router, public jobSrv: JobsService, public authSrv: AuthService,
              private readonly pigeonSrv: PigeonService) {
      super(router, jobSrv, authSrv);
   }

  currentJob: Job;
  ngOnInit() {
    this.pigeonSrv.getCurrentData
    .subscribe(jsonData => {
        this.currentJob = JSON.parse(jsonData);
    });
  }

  onSubmit() {
    this.jobSrv.updateJob(this.currentJob)
    .subscribe(
        data => {
            this.redirectTo('me');
          });
  }

  onCancel() {
    this.redirectTo('me');
  }

}
