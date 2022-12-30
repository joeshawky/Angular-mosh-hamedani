import { Component } from '@angular/core';

interface Error {
  objectName: string;
  type: string;
  message: string;
}
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  errors: Error[] = [];
  inputActive : boolean = false;

  createError(objectName: string, type: string, message: string) : Error {
    let error: Error = { 
      objectName: objectName, 
      type: type, 
      message: message 
    };
    return error;
  }

  errorExists(error: Error) : boolean{
    return this.errors.findIndex((e) => e.type === error.type && e.objectName === error.objectName) !== -1
  }

  removeRelatedErrors(errorObject:string):void{
    let index = this.errors.findIndex(e => e.objectName === errorObject);
    if(index !== -1){
      this.errors.splice(index, 1);
    }
  }

  logErrors(model) {
    
    let error : Error | undefined = undefined;
    console.log(model);

    if (model.hasError('required')) {
      let message = `${model.name} is required`
      error = this.createError(model.name, 'required', message);
      this.removeRelatedErrors(model.name);
    }if(model.hasError('minlength')){
      let message = `${model.name} minimum length is ${model.errors.minlength.requiredLength}`
      error = this.createError(model.name, 'minlength', message);
      this.removeRelatedErrors(model.name);
    }if(model.hasError('maxlength')){
      let message = `${model.name} maximum length is ${model.errors.maxlength.requiredLength}`
      error = this.createError(model.name, 'maxlength', message);
      this.removeRelatedErrors(model.name);
    }if(model.hasError('min')){
      let message = `${model.name} minimum is ${model.errors.min.min}`
      error = this.createError(model.name, 'min', message);
      this.removeRelatedErrors(model.name);
    }if(model.hasError('max')){
      let message = `${model.name} maximum is ${model.errors.max.max}`
      error = this.createError(model.name, 'max', message);
      this.removeRelatedErrors(model.name);
    }

    if(model.valid){
      this.removeRelatedErrors(model.name);
    }

    if(error !== undefined && !this.errorExists(error)){

      this.errors.push(error);
      console.log(error);
    }

    console.log(this.errors);

  }


  submit(form: any) {
    if(form.valid){
      console.log('Submitting form... ');
      console.log(form.form);
      form.reset();
    }else{
      console.log('failed')
    }
  }
}
