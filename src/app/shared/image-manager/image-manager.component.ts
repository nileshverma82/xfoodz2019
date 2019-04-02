import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { tap, finalize } from 'rxjs/operators';
import { Fooditem } from 'src/app/core/model';

interface Image {
  path: string;
  url: string;
}

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss']
})
export class ImageManagerComponent implements OnChanges, OnInit, OnDestroy {
  @Input() fooditem: Fooditem;
  @Output() imageUploaded = new EventEmitter();
  preview: Image; // used to put current image on display.
  tempImages: Image[];
  imagesDeleted: Image[];
  imagesAdded: Image[];
  upload$;
  uploadPercentage$: Observable<number>;
  snapshot;
  subscription: Subscription;
  downloadUrl: string;
  maxFileUploadCount: number;
  fileCounter: number;

  storagePath: string;

  constructor( private storage: AngularFireStorage ) {
    this.storagePath = 'productImages';
    this.maxFileUploadCount = 4;
    this.fileCounter = 0;
    this.imagesDeleted = [];
    this.imagesAdded = [];
  }

  ngOnChanges() {}

  ngOnInit() {
    if (this.fooditem.images.length === 0) {
      this.tempImages = [];
      this.fileCounter = 0;
    } else {
      this.tempImages = this.fooditem.images;
      this.preview = this.tempImages[0];
      this.fileCounter = this.tempImages.length;
    }
  }

  updateFileCounter(counter: number) {
    this.fileCounter = this.fileCounter + counter;
  }

  getImageFile(image: File) {
    if (!image) {
      return;
    } // Retrun if no image selected.
    this.addImage(image);
  }

  addImage(image: File) {
    const path = `${this.storagePath}/${this.fooditem.id}/${new Date().getTime()}_${
      image.name
    }`;

    const ref = this.storage.ref(path);
    this.upload$ = this.storage.upload(path, image);
    this.uploadPercentage$ = this.upload$.percentageChanges();
    this.snapshot = this.upload$.snapshotChanges().pipe(
      tap(console.log),
      finalize( async () => {
        this.preview = await ref.getDownloadURL().toPromise();
        this.tempImages.push(this.preview);
        this.updateFileCounter(1);
      })
    );
  }

  deleteImage(img: Image) {
    const index = this.tempImages.indexOf(img);
    if (index !== -1) {
      this.imagesDeleted.push(img); // 1. Add the image to imagesDeleted array.
      this.tempImages.splice(index, 1); // 2. Soft delete: Remove the image form images array.
      this.preview = this.tempImages[0]; // 3. Set the preview to first image of the images array.
      this.updateFileCounter(-1); // 4. Set the selected file count.
      // this.imageUploaded.emit(this.images); // 5. Emit the images array to parent component.
      console.log('TODO: CLEANUP >> imagesDeleted[]: ', this.imagesDeleted);
    }

    this.updateFileCounter(-1);
    console.log('TODO: Delete image');
  }


  storageCleanup(images: any) {
    // Pass imagesDeleted[] on product save action.
    // Pass imagesAdded[]   on product cancle action.
    console.log(' #### Cleanup: Free storage for these images ####');
    images.forEach(image => {
      this.storage.ref(image.path).delete();
    });
  }

  cleanupOnSave() {
    this.storageCleanup(this.imagesDeleted);
  }

  cleanupOnDiscard() {
    this.storageCleanup(this.imagesAdded);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
