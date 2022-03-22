import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbLoginComponent } from '@nebular/auth';

@Component({
    selector: 'ngx-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],

})
export class NgxLoginComponent {
    form: FormGroup;

    loading = false;

    submitted = false;

    showMessages: any = {}
    errors: string[] = [];
    messages: string[] = [];

    constructor(private afAuth: AngularFireAuth, private fb: FormBuilder, private router: Router) { }

    ngOnInit() {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: [
                '',
                [Validators.minLength(6), Validators.required]
            ],
        });
        this.form.valueChanges.subscribe(v => console.log(v))
    }


    get email() {
        return this.form.get('email');
    }
    get password() {
        return this.form.get('password');
    }


    async onSubmit() {
        this.errors = [];
        this.messages = [];
        this.submitted = true;
        this.loading = true;

        const email = this.email.value;
        const password = this.password.value;

        try {
            await this.afAuth.signInWithEmailAndPassword(email, password).then(el =>{
                this.messages.push("Se ha iniciado sesión correctamente")
                this.router.navigate(['/'])

            }
            );
        } catch (err) {
            console.log('feo')
            this.errors.push(err)
            this.submitted = false
        }

        this.loading = false;
    }


}