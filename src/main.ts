import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


export const firebaseApp = initializeApp(environment.firebase);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
