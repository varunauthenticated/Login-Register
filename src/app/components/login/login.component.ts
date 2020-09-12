import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/shared/client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
  }
createForm() {
  this.userForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });
}

  loginSubmit() {
    let user: any = {};
    user.userName = this.userForm.value.userName;
    user.password = this.userForm.value.password;
    this.clientService.userAuthentication(user);
    if(this.clientService.validUser) {
      this.toastr.success('Login Successfully!', 'Authenticated');
      this.router.navigate(['/home'])
    } else {
      this.toastr.warning('Invalid Credentials!', 'Authentication Failed!');
    }
  }

}
