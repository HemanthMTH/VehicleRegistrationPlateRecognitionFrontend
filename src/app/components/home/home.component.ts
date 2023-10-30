import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  resultsAvailable: boolean = false;
  extractedText: string = 'AP2414646';
  selectedFile!: File;
  uploadResponse: any = null;
  uploadSuccessful: boolean = false;
  mediaType: 'image' | 'video' | null = null;
  detectedImageSrc!: string;
  videoSrc!: string;
  isProcessed: boolean = false;
  isLoading: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getHello().subscribe((data) => {
      console.log('here', data);
    });
  }

  onFileSelected(event: any) {
    this.isProcessed = false;
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        const fileExtension = this.selectedFile.name
          .split('.')
          .pop()
          ?.toLowerCase();

        if (fileExtension) {
          if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
            this.mediaType = 'image';
          } else if (fileExtension === 'mp4') {
            this.mediaType = 'video';
          }
        }

        this.uploadSuccessful = true;
      } else {
        this.uploadSuccessful = false;
      }
    }
  }

  onUpload() {
    if (this.selectedFile) {
      this.isLoading = true;
      console.log('Initiating upload for:', this.selectedFile);

      this.dataService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          console.log('Server Response:', response);
          this.uploadResponse = response;

          const baseUrl = this.getBaseUrl();
          if (this.mediaType === 'image') {
            this.detectedImageSrc = `${baseUrl}${response.file_path}`;
          } else if (this.mediaType === 'video') {
            this.videoSrc = `${baseUrl}${response.file_path}`;
          }
          this.resultsAvailable = true;
          this.isProcessed = true;
          this.isLoading = false;
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
