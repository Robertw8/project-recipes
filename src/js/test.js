import { getRequestsService } from './API/api-service';

export function exampleRequest() {
  //? В аргументи getRequestsService вказуємо що саме треба отримати, за потреби вказуємо params другим аргументом
  getRequestsService('areas').then(console.log);
}
