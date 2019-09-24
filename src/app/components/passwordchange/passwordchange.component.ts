import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { Register } from 'src/app/models/register';
import { PasswordcryptService } from 'src/app/service/passwordcrypt.service';

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.css']
})
export class PasswordchangeComponent implements OnInit {

  registeruser: Register;
  iscompletechange: boolean = false;
  oldpassword: string = "";
  newpassword: string = "";
  confirmpassword: string = "";
  constructor(private loginservice: LoginserviceService, private passwordencrypt: PasswordcryptService) {

  }

  ngOnInit() {
  }

}
