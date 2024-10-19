// Import bcryptjs in your service or component
import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';


@Injectable({
    providedIn: 'root', // This makes the service available globally
})
export class PasswordService {

    // Method to hash the password
    hashPassword(password: string): string {
        const salt = "$2a$10$16tE2dV9V6exMeUMuwDK8e";//bcrypt.genSaltSync(10); // Generate a salt (you can adjust the number of rounds)
        return bcrypt.hashSync(password, salt); // Hash the password with the salt
    }

    // Method to compare the plain password with the hashed one
    verifyPassword(password: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(password, hashedPassword); // Compare plain password with hashed password
    }
}
