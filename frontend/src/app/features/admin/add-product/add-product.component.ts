import { CommonModule, Location } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserManagementService } from '../../../shared/services/userServices/user-management.service';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  productForm!: FormGroup;
  base64Image?: string | null;

  isFormSubmitted: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private location: Location, private fb: FormBuilder, private _productManagement: ProductManagementService) {}

  ngOnInit(): void {
    // inint form 
    this.productForm = this.fb.group({
      productId: ['', Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', [Validators.required]],
      image: [null, Validators.required],
      specifications: ['', Validators.required],
      color: ['', Validators.required],
      weight: ['', Validators.required],
      material: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  // convert image to base64Image 
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.base64Image = reader.result as string;
        this.productForm.controls['image'].setValue(this.base64Image);
      };
      reader.readAsDataURL(file);
    }
  }
  

  // on submiting the from 
  onSubmit() {
    this.isFormSubmitted = true
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      const productData = this.productForm.value
      console.log("valid product");
      // Add submission logic here ----
      this._productManagement.createProduct(productData).subscribe(
        (res) => {
          console.log("Added prododuct is: ");
          console.log(res);
          
          
        },(error) => {
          console.error(error);
          
        }
      )

      
      
    }
  }

  // to navigate  back
  navigateBack() {
    this.location.back();
  }
}
