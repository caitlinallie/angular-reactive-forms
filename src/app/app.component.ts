import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
    signupForm!: FormGroup;
    addressForm!: FormGroup;
    phoneForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): any {
        this.signupForm = this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(4)
            ]],
            age: ['', [
                Validators.required,
                Validators.min(18)
            ]],
            agreeToTerms: [false, [
                Validators.requiredTrue
            ]]
        });

        this.addressForm = this.formBuilder.group({
            homeAddress: this.formBuilder.group({
                street: '',
                city: '',
                state: ''
            }),
            businessAddress: this.formBuilder.group({
                street: '',
                city: '',
                state: ''
            })
        });

        const phone = this.formBuilder.group({
            area: [],
            prefix: [],
            line: []
        });

        this.phoneForm = this.formBuilder.group({
            phones: this.formBuilder.array([phone])
        });
    }

    onSubmit(form: FormGroup): void {
        console.log(form.value);
    }

    resetForm(form: FormGroup): void {
        form.reset();
    }
    get phoneForms(): FormArray {
        return this.phoneForm.get('phones') as FormArray;
    }

    addPhone(): void {
        const phone = this.formBuilder.group({
            area: [],
            prefix: [],
            line: []
        });
        this.phoneForms.push(phone);
    }

    removePhone(i: number): void {
        this.phoneForms.removeAt(i);
    }
}
