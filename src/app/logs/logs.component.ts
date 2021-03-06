import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private api: UtilityService) { }

  logsForm: FormGroup;
  namespace = []
  podname = []
  errNamespace = false;
  errPodName = false;
  errMessage = false;

  logButtonDownloading = false;
  logButtonMsg = 'Download Logs';

  ngOnInit(): void {
    this.logsForm = this.formBuilder.group({
      namespace: ['Select Namespace', [Validators.required, this.validateDefault]],
      podname: ['Select Pod Name', [Validators.required,this.validateDefault]],
      loglevel: ['INFO',Validators.required]
    })

    this.api.getNamespace().subscribe((res)=>{
      this.namespace = res["namespaces"].split(',');
    },(err)=>{
      this.errNamespace = true;
    })

  }

  validateDefault(form){    
    if(form.value=='Select Namespace' || form.value=='Select Pod Name')
      return {
        "message": "Default is selected"
      };
    return null;
  }

  getPods(namespace){
    this.api.getPods(namespace).subscribe((res)=>{
      this.podname = res["pods"].split(',');
    },(err)=>{
      this.errNamespace = true;
    })
  }

  getLogs(){
    this.errMessage = false
    this.logButtonDownloading = true;
    this.logButtonMsg = 'Downloading in Progress'
    this.api.processLogs(this.logsForm.controls['namespace'].value,this.logsForm.controls['podname'].value,this.logsForm.controls['loglevel'].value)
    .subscribe((res)=>{
      this.logButtonDownloading = false;
      this.logButtonMsg = 'Download Logs'
      this.errMessage = false
    },(err)=>{
      this.logButtonDownloading = false;
      this.logButtonMsg = 'Download Logs'
      this.errMessage = true
    })
  }

}
