import { Component, OnInit } from '@angular/core';
import { MediaType } from 'src/app/models/type';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  resultsAvailable: boolean = false;
  extractedText: string = '';
  selectedFile!: File;
  uploadSuccessful: boolean = false;
  mediaType: MediaType | null = null;
  detectedImageSrc!: string;
  videoSrc!: string;
  isProcessed: boolean = false;
  isLoading: boolean = false;

  constructor(private dataService: DataService) {}

  get type(): string {
    return this.mediaType === MediaType.image ? 'image' : 'video';
  }

  ngOnInit(): void {
    this.dataService.getHello().subscribe((data) => {
      console.log('just checking!!', data);
    });
  }

  onFileSelected(event: Event): void {
    this.isProcessed = false;
    const target =  event.target as HTMLInputElement
    if (target.files && target.files.length) {
      this.selectedFile = target.files[0];
      if (this.selectedFile) {
        const fileExtension = this.selectedFile.name
          .split('.')
          .pop()
          ?.toLowerCase();

        if (fileExtension) {
          if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
            this.mediaType = MediaType.image;
          } else if (fileExtension === 'mp4') {
            this.mediaType = MediaType.video;
          }
        }
        this.uploadSuccessful = true;
      } else {
        this.uploadSuccessful = false;
      }
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.isLoading = true;
      this.dataService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          // console.log('Server Response:', response);
          const baseUrl = this.getBaseUrl();
          if (this.mediaType === MediaType.image) {
            this.detectedImageSrc = `${baseUrl}${response.file_path}`;
          } else if (this.mediaType === MediaType.video) {
            this.videoSrc = `${baseUrl}${response.file_path}`;
          }
          this.resultsAvailable = true;
          this.isProcessed = true;
          this.isLoading = false;
          this.extractedText = response.extracted_text ? response.extracted_text : '';
        },
        (error) => console.error('Server Error:', error)
      );
    } else {
      console.error('No file selected.');
    }
  }

  getBaseUrl(): string {
    return this.dataService.baseUrl;
  }
}
