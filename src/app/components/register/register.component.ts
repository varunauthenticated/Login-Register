import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/shared/client.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientModel } from 'src/app/shared/client.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'Add Record';
  clientId: number;
  clientData: ClientModel[];
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.createForm();
   }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.clientId = +param.id ? +param.id : 0
    });
    if(this.clientId !== 0) {
      this.title = 'Edit Record'
      this.clientData = this.clientService.clientDetail.filter(data => data.id === this.clientId);
      let cd = this.clientData;
      this.editClientData(cd);
    }
  }

  editClientData(c_data: ClientModel[]) {
    this.registerForm.patchValue({
      name: c_data[0].name,
      type: c_data[0].type,
      subType: c_data[0].subType
    });
    this.registerForm.setControl('tags', this.setClientControl(c_data[0].freeTag))
  }

  setClientControl(tagData): FormArray {
    const frmArray = new FormArray([]);
    tagData.forEach(element => {
      frmArray.push(this.fb.control(element))
    });
    return frmArray;
  }
  createForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      subType: ['', Validators.required],
      tags: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });
  }

  get tags() {
    return this.registerForm.get('tags') as FormArray;
  }

  onAddTag() {
    this.tags.push(this.fb.control('', Validators.required));
    // (<FormArray>this.registerForm.get('tags')).push(this.addTagFormGroup());
  }
  removeTag(indexValue){
    console.log(indexValue);
    this.tags.removeAt(indexValue);
  }
onSubmit() {
  if(this.clientId !== 0){
    let createdData: any = {};
  createdData.id = this.clientData[0].id;
  createdData.name = this.registerForm.get('name').value;
  createdData.type = this.registerForm.get('type').value;
  createdData.subType = this.registerForm.get('subType').value;
  createdData.freeTag = this.registerForm.get('tags').value;
  this.clientService.deleteClient(this.clientData[0].id);
  this.clientService.clientDetail.push(createdData);
  this.toastr.success('Record Updated', 'Status');
  this.router.navigate(['/home']);
  }else {
    let createdData: any = {};
  createdData.id = this.clientService.clientDetail.length + 1;
  createdData.name = this.registerForm.get('name').value;
  createdData.type = this.registerForm.get('type').value;
  createdData.subType = this.registerForm.get('subType').value;
  createdData.freeTag = this.registerForm.get('tags').value;
  this.clientService.clientDetail.push(createdData);
  this.toastr.success('Record Added', 'Status');
  this.router.navigate(['/home']);
  }
}
}
