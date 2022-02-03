import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'src/app/models/state';
import { BinService } from 'src/app/services/bin/bin.service';
import { DateService } from 'src/app/services/date/date.service';
import { WorkerService } from 'src/app/services/worker/worker.service';
import { Worker } from '../../../models/worker';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  idWorker! : string | null
  firstFormGroupWorker!: FormGroup;
  secondFormGroupWorker!: FormGroup;
  newWorker!: Worker
  canFollowStep2: boolean = false
  canCreate: boolean = false; 

  momentDate = new Date()

  states = [
    {value: "Working", text: "Alta"},
    {value: "Down", text: "Baja"},
    {value: "InProcess", text: "En Trámite"}
  ];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private workerService : WorkerService,
              private dateService : DateService,
              private binService : BinService) { }

  ngOnInit(): void {
    this.firstFormGroupWorker = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      dniCtrl: ['', Validators.required],
      bornDateCtrl: ['', Validators.required],
    });
    this.secondFormGroupWorker = this.formBuilder.group({
      nationalityCtrl: ['', Validators.required],
    });

    this.newWorker = {
      id: "0",
      name : '',
      firstName: '',
      lastName: '',
      dni: '',
      bornDate: this.momentDate,
      bornDateString: '',
      nationality: '',
      state : State.Working
    };

    this.canCreate = false;
    this.canFollowStep2 = false 
  }

  editDate(event: MatDatepickerInputEvent<Date>){
    this.newWorker.bornDate = event.value!
  }

  canCreateWorker() : string{
    var stateCreation = "Rellene los campos obligatorios"
    this.canCreate = false
    if (this.newWorker.nationality != '') {
      stateCreation = ""
      this.canCreate = true
    }
    return stateCreation
  }

  checkAllInputsGroup1AreFiled() :string{
    var inputFiled = 0

    if (this.newWorker.name != '') {
      inputFiled++;
    }
    if (this.newWorker.firstName != '') {
      inputFiled++;
    }
    if (this.newWorker.lastName != '') {
      inputFiled++;
    }
    if (this.newWorker.dni != '') {
      inputFiled++;
    }
    if (this.newWorker.bornDate != this.momentDate) {
      inputFiled++;
    }

    var stateCreation : string = "Compruebe que todos los campos estan rellenos"
    this.canFollowStep2 = false
    
    if (inputFiled == 5) {
      this.canFollowStep2 = true
      stateCreation = ""
    }

    return stateCreation
  }

  createWorker(){
    var id = this.workerService.workers.length + this.binService.getBinLength() + 1
    this,this.newWorker.id = id.toString()
    this.newWorker.bornDateString = this.dateService.getDate(this.newWorker.bornDate)
    this.workerService.addWorkers(this.newWorker)
  }
  
  goBack(){
    this.router.navigateByUrl('/')
  }
  
}