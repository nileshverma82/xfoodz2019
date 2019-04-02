import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoadService {

  constructor() { }

  public loadScript(url, id, c): void {
    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.id = id;
      if (c)  {
        script.addEventListener('load', (e) => {
          c(null, e);
        }, false);
      }
      document.head.appendChild(script);
    }
  }

}
