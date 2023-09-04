import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @ViewChild('videoElement') videoElement: ElementRef = new ElementRef(null);

  ngOnInit() {
    // Accede al elemento de video del DOM
    const video = this.videoElement.nativeElement as HTMLVideoElement;

    // Comprueba si el navegador es compatible con la API de medios web
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          // Asigna el flujo de la cámara al elemento de video
          video.srcObject = stream;
          video.play();
        })
        .catch((error) => {
          console.error('Error al acceder a la cámara: ', error);
        });
    } else {
      console.error('La API de medios web no es compatible con este navegador.');
    }
  }
}
