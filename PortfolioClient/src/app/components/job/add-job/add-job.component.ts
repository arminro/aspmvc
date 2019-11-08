
import { Job } from './../../../viewmodels/job-model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ComponentBase } from '../../component-base';
import { JobsService } from 'src/app/services/jobs.service';
import { JobcomponentBase } from '../jobcomponent-base';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent extends JobcomponentBase implements OnInit {

  constructor(public router: Router, public jobSrv: JobsService, public authSrv: AuthService) {
    super(router, jobSrv, authSrv);
  }

  jobToAdd: Job;
  ngOnInit(): void {
    this.jobToAdd = new Job();
  }

  onSubmit() {
    this.jobToAdd.userId = this.authSrv.currentUserValue.id;
    this.jobSrv.createJob(this.jobToAdd)
    .subscribe(
        data => {
            this.redirectTo('me');
          });
  }

}
