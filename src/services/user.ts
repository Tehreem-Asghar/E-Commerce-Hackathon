import fs from 'fs';
import path from 'path';
import {compare, hash} from "bcryptjs"


const filePath = path.join(process.cwd(),"src" ,"data", "users.json");

export function getAll(): any[] {
    const data = fs.readFileSync(filePath, 'utf-8'); // Specify encoding
    return JSON.parse(data);
}

export function getById(id: number): any {
    const data = getAll();
    return data.find((p: any) => p.id === id); // Explicit 'any' for `p` or define a Product type
}


export  function getByEmail(email : string): any {
    const data = getAll();
    return data.find((p: any) => p.email.toLoweCase() === email.toLowerCase()); // Explicit 'any' for `p` or define a Product type
}


export async  function verifyPassword(hashedPassword : string , password : string) {
    const isValid = await compare(password , hashedPassword)
    return isValid  //ya true false ma answer kara ga
}

export async function save(email: string, password: string) {
    const found = getByEmail(email);
    if(found){
        throw new Error("User Already Exists")
    }
    const data = getAll();
    const hashedPassword = await hash(password, 12)
    data.push({
        id: data.length + 1,
         email , hashedPassword
       
    });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // Add formatting for JSON output
}

















// import fs from 'fs';
// import path from 'path';

// const filePath = path.join(process.cwd(), "data", "products.json");

// export function getAll () {
//     const data = fs.readFileSync(filePath);
//     return JSON.parse(data);
// }

// export function getById (id) {
//     const data = getAll();
//     return data.find(p => p.id === Number(id));
// }

// export function save (title, description, price) {
//     const data = getAll();
//     data.push({
//         id: data.length + 1,
//         title, description, price
//     });
//     fs.writeFileSync(filePath, JSON.stringify(data));
// }