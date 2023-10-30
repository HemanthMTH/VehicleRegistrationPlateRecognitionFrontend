import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  resultsAvailable: boolean = true;
  detectedImageSrc!: string;
  extractedText: string = 'AP2414646';
  selectedFile!: File;
  uploadResponse: any = null;
  uploadSuccessful: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getHello().subscribe((data) => {
      console.log('here', data);
    });
  }

  onResultsReady(imageSrc: string, text: string) {
    this.detectedImageSrc = imageSrc;
    this.extractedText = text;
    this.resultsAvailable = true;
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.uploadSuccessful = this.selectedFile ? true : false;
    }
  }

  onUpload() {
    if (this.selectedFile) {
      console.log('Initiating upload for:', this.selectedFile);
      this.dataService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          console.log('Server Response:', response);
          this.uploadResponse = response;
        },
        (error) => console.error('Server Error:', error)
      );
    } else {
      console.error('No file selected.');
    }
  }
}
