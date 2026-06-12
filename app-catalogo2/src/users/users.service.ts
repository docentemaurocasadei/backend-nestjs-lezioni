import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  surname: string;
  phone: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Mario', surname: 'Rossi', phone: '1234567890' },
    { id: 2, name: 'Luigi', surname: 'Verdi', phone: '0987654321' },
  ];
  create(data: any) {
    const maxId = this.users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    const newUser: User = {
      id: maxId + 1,
      name: data.name,
      surname: data.surname,
      phone: data.phone
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  update(id: number, data: any) {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users[userIndex] = { ...this.users[userIndex], ...data };
    return this.users[userIndex];
  }

  remove(id: number) {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.users.splice(userIndex, 1)[0];
  }
  search(q: string) {
    console.log('Searching for:::', q);
    const results = this.users.filter(user => 
      user.name.toLowerCase().includes(q.toLowerCase()) ||
      user.surname.toLowerCase().includes(q.toLowerCase()) ||
      user.phone.includes(q)
    );
    if (results.length === 0) {
      throw new NotFoundException(`No users found matching query: ${q}`);
    }
    return results.length > 0 ? results : null;
  }
}
