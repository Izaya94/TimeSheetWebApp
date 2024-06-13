import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserTimezoneService {
  getTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
}
