
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router, private alerta: AlertController,) { 
    document.addEventListener('DOMContentLoaded', this.inicializar.bind(this));
  }

  audio: any;
  photo: any = "";
  numberphoto: number = 1;
  icone: string = 'mic';
  recording: any = false; 
  talking: any = false;
  lampInterval: any;
  lamp: any = "../../assets/Sprites/Lamp_OlhoAberto.png";

  async ngOnInit() {
    this.idleLamp()
  }
  
  inicializar (id: any) {
    let audioChunks: Blob[] = [];
  
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        console.log(stream)

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };
        
        mediaRecorder.onstart = () => {
          console.log("começou")
        }
        
        mediaRecorder.onstop = () => {
          console.log("parou mesmo")
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audioPlayer = new Audio();
          console.log(audioUrl)
          audioPlayer.src = audioUrl;
          audioPlayer.play();
          this.talking = true
          this.idleLamp()
          audioPlayer.addEventListener('ended', () => {
            console.log("terminou")
            this.talking = false; // Defina talking como false quando a reprodução terminar
          });
        }
        
        if(id == 'start'){
          mediaRecorder.start();
          this.recording = true;
          setTimeout(() => {
            mediaRecorder.stop();
            this.recording = false;
         }, 10000);
        } 
      })
  }


  idleLamp(){
    console.log("ok")
    if (!this.talking) {
      let intervalId = setInterval(() => {
      this.lamp = "../../assets/Sprites/Lamp_OlhoFechado.png";
      setTimeout(() => {
        this.lamp = "../../assets/Sprites/Lamp_OlhoAberto.png";
        }, 3000);
      }, 3000);
    }
    if(this.talking){
      console.log("falando")
      let intervalId = setInterval(() => {
      this.lamp = "../../assets/Sprites/Lamp_Talking_Aberto.png";
      setTimeout(() => {
        this.lamp = "../../assets/Sprites/Lamp_OlhoFechado.png";
        }, 3000);
      }, 3000);
    }
  }

  async abrir() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        source: CameraSource.Camera,  // Especifica que a foto deve ser tirada pela câmera
        resultType: CameraResultType.DataUrl,
      });
  
      this.photo = image.dataUrl;
      console.log(this.numberphoto)
      localStorage.setItem('Photo' + this.numberphoto.toString(), this.photo)
      localStorage.setItem('numeroDeFotos', this.numberphoto.toString())
      this.numberphoto += 1

      const alertOk = await this.alerta.create({
        message:'Sua foto foi salva na galeria!',
      })
      alertOk.present()

    } catch (error) {
      console.error('Error taking picture', error);
    }
  }

  menu() {
    this.router.navigate(['/home']);
  }

}
