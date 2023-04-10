import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { Pdf } from './pdf';

declare var $: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],

})




export class BlogComponent implements OnInit {

  constructor(
    private fileService: FileService
  ) { }

  filterText = "";
  articles: Pdf[] = [];
  pdfSrc = "";
  fileName = "";


  ngOnInit() {
    this.fileService.getFiles().subscribe(data => {
      this.articles = data.body;
      
    })

  }


  show(file) {
    this.pdfSrc = "http://127.0.0.1:8080/" + file.fileName;
    this.fileName = file.fileName;
    $('.' + file.id).css("cssText", "background-color:red !important")
    $('.' + file.id).parent().siblings().children().css("cssText", "background-color:none !important")



  }

  nextPdf() {
    var index = this.articles.findIndex(e => e.fileName == this.fileName)
    if (index != this.articles.length - 1) {
      this.pdfSrc = "http://127.0.0.1:8080/" + this.articles[index + 1].fileName ;
      $('.' + this.articles[index + 1].id).css("cssText", "background-color:red !important")
      $('.' + this.articles[index + 1].id).parent().siblings().children().css("cssText", "background-color:none !important")
      this.fileName = this.articles[index + 1].fileName;
    }
  }

  previousPdf() {
    var index = this.articles.findIndex(e => e.fileName == this.fileName)
    if (index != 0) {
      this.pdfSrc = "http://127.0.0.1:8080/" + this.articles[index - 1].fileName ;
      $('.' + this.articles[index - 1].id).css("cssText", "background-color:red !important")
      $('.' + this.articles[index - 1].id).parent().siblings().children().css("cssText", "background-color:none !important")
      this.fileName = this.articles[index - 1].fileName;
    }
  }



  reset() {
    this.pdfSrc = "";
    this.filterText ="";
    $('.pdfarticles').children().children('a').css("cssText", "background-color:none !important")
  }

  selectOver(id) {
    $('.' + id).css('background-color', 'red');

  }

  selectOut(id) {
    $('.' + id).css('background-color', '');
  }

}
