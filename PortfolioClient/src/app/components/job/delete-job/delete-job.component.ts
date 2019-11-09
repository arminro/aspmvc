import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';
import { AuthService } from 'src/app/services/auth.service';
import { JobcomponentBase } from '../jobcomponent-base';
import { Job } from 'src/app/viewmodels/job-model';
import { PigeonService } from 'src/app/services/pigeon.service';

@Component({
  selector: 'app-delete-job',
  templateUrl: './delete-job.component.html',
  styleUrls: ['./delete-job.component.css']
})
export class DeleteJobComponent extends JobcomponentBase implements OnInit {

  constructor(public router: Router, public jobSrv: JobsService, public authSrv: AuthService, private readonly pigeonSrv: PigeonService) {
    super(router, jobSrv, authSrv);
  }

  jobToDelete: Job;
  deleteText: string;
  ngOnInit(): void {
    this.pigeonSrv.getCurrentData
    .subscribe(jsonData => {
        this.jobToDelete = JSON.parse(jsonData);
    });
    this.deleteText = `${this.jobToDelete.position} at ${this.jobToDelete.employer}
    from ${this.jobToDelete.startDate}`;
  }

  onSubmit() {
    console.log(this.deleteText);
    this.jobSrv.deleteJob(this.jobToDelete)
    .subscribe(
        data => {
            this.redirectTo('me');
          });
  }

  onCancel() {
    this.redirectTo('me');
  }

}
