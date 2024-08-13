import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
  imageRemaining: number = 4;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private _productManagement: ProductManagementService
  ) {}

  ngOnInit(): void {
    // inint form
    this.productForm = this.fb.group({
      productId: ['', Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', [Validators.required]],
      images: this.fb.array([], [Validators.required, this.minArrayLength(4)]),
      specifications: ['', Validators.required],
      color: ['', Validators.required],
      weight: ['', Validators.required],
      material: ['', Validators.required],
      gender: ['', Validators.required],
    });

  }

  // to get the image array from form
  get imagesFormArray(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  // clear image forms array
  clearImagesFormArray() {
    while (this.imagesFormArray.length) {
      this.imagesFormArray.removeAt(0);
    }
  }

  //validator to check if the image array has min 4 Images
  minArrayLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as FormArray;
      return formArray.length < min
        ? {
            minArrayLength: {
              requiredLength: min,
              actualLength: formArray.length,
            },
          }
        : null;
    };
  }

  // to add image to image array on form
  addImage(image: string): void {
    this.imagesFormArray.push(this.fb.control(image, Validators.required));
  }

  // convert image to base64Image
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (this.imagesFormArray.length < 4) {
          this.addImage(reader.result as string);
          this.imageRemaining--;
        } else {
          alert('You can only upload a maximum of 4 images.');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // on submiting the from
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      const productData = this.productForm.value;
      console.log('valid product', productData);
      // Add submission logic here ----
      this._productManagement.createProduct(productData).subscribe(
        (res) => {
          Swal.fire({
            text: "Product added succesfully",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });

          this.isFormSubmitted = false;
          this.imageRemaining = 4;
          // Clear the images form array
          this.clearImagesFormArray();
          this.productForm.reset();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  // to navigate  back
  navigateBack() {
    this.location.back();
  }
}
