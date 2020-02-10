import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { RegisterRequest } from '../../model/register-request.model'
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors'
import { registerAction } from '../../store/action/register.action'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  isSubmitting = () => this.store.pipe(select(isSubmittingSelector));
  backendErrors = () => this.store.pipe(select(validationErrorsSelector));


  initializeForm(): void {
    console.log('initializeForm')
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
    console.log('submit', this.form.value, this.form.valid)
    const request: RegisterRequest = { user: this.form.value };
    this.store.dispatch(registerAction({ request }));
  }
}
