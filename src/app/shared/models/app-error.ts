import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

export function getServerErrorMessage(error: HttpErrorResponse): string {
  switch (error.status) {
    case 404: {return `Not Found: ${error.error}`;
    }
    case 403: {
      return `Access Denied: ${error.error}`;
    }
    case 500: {
      return `Internal Server Error: ${error.error}`;
    }
    default: {
      return `Unknown Server Error: ${error.message}`;
    }

  }
}

export function errorFunction(error: any): any{
  let errorMsg: string;
  if (error.error instanceof ErrorEvent) {
    errorMsg = `Error: ${error.error.message}`;
  } else {
    errorMsg = getServerErrorMessage(error);
  }
  alert(errorMsg);
  return throwError(errorMsg);
}
