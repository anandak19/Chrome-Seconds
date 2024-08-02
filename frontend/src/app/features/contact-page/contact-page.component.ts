import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent implements OnInit{
  contactForm!: FormGroup
  isFormSubmitted: boolean = false


  constructor (private _fb: FormBuilder) {}


  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.contactForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required]]
    })
  }

  onSubmit(){
    this.isFormSubmitted = true
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // add logic to send this data to google sheet 
    }
  }

}
