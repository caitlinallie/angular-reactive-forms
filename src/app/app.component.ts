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
    contactForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.buildSignupForm();
        this.buildAddressForm();
        this.buildContactForm();
    }

    buildSignupForm(): void {
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

        this.signupForm.valueChanges.subscribe((value) => {
            console.log('Value of signup form has changed! ', value);
        });

        this.signupForm.statusChanges.subscribe((value) => {
            console.log('Status of signup form has changed! ', value);
        });
    }

    buildAddressForm(): void {
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
    }

    buildContactForm(): void {
        const contact = this.formBuilder.group({
            firstName: [],
            lastName: [],
            phoneNumber: []
        });

        this.contactForm = this.formBuilder.group({
            contacts: this.formBuilder.array([contact])
        });
    }

    onSubmit(form: FormGroup): void {
        console.log(form.value);
    }

    resetForm(form: FormGroup): void {
        form.reset();
    }

    get contactForms(): FormArray {
        return this.contactForm.get('contacts') as FormArray;
    }

    addContact(): void {
        const contact = this.formBuilder.group({
            firstName: [],
            lastName: [],
            phoneNumber: []
        });
        this.contactForms.push(contact);
    }

    removeContact(i: number): void {
        this.contactForms.removeAt(i);
    }
}
