import { AbstractControl} from "@angular/forms";

export class PasswordValidators {
    static MatchValidator(control: AbstractControl) {
        const password: string = control?.get("password")?.value; 
        const confirmPassword: string = control?.get("confirmPassword")?.value;
        
        if (!confirmPassword?.length) {
            return null;
        }

        if (password !== confirmPassword) {
            control?.get("confirmPassword")?.setErrors({ mismatch: true });
        }

        return null;
    }
}