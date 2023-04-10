import { Component, OnInit, AbstractType } from '@angular/core';
import { Pdf } from '../blog/pdf';
import { FileService } from '../services/file.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AlertifyService } from '../services/alertify.service';
import { AccountService } from '../services/account.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import sweetAlert from 'sweetalert';


declare var $: any;


@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {



  constructor(
    private fileService: FileService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private accountService: AccountService,
    private modalService: NgbModal

  ) { }


  form: FormGroup;
  updateForm: FormGroup;
  articles: Pdf[];
  article: Pdf = new Pdf();
  newArticle: Pdf = new Pdf();

  createFileForm() {
    this.form = this.formBuilder.group({
      selectedFile: ["", Validators.compose([Validators.required, PdfValidator])],
      title: ["", Validators.required],
      explanation: ["", Validators.compose([Validators.required, Validators.max(150)])]

    });

    function PdfValidator(control: AbstractControl): { [key: string]: boolean } | null {
      if (control.value.type != "application/pdf") {
        return { 'selectedFile': true };
      }
      return null;
    }
  }

  createFileForm2() {
    this.updateForm = this.formBuilder.group({
      title: ["", Validators.required],
      explanation: ["", Validators.compose([Validators.required, Validators.max(150)])],
      fileName: ["", Validators.required]

    });

  }

  ngOnInit() {
    this.getFileData();
    this.createFileForm();
    this.createFileForm2();
    this.accountService.multipleLogin();
    window.addEventListener("beforeunload", function () {
      localStorage.removeItem("multipleLogin");
    })
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('selectedFile').setValue(file)
    }
  }

 file : any;

  newFileOnFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      $('#newSelectedFile').value = this.file
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('selectedFile').value);
    formData.append("title", this.form.get('title').value);
    formData.append("explanation", this.form.get('explanation').value);

    var updatingFileName = this.form.get('selectedFile').value.name
    if (this.articles.find(x => x.fileName == updatingFileName))
      // this.alertifyService.error("Bu dosya mevcuttur.")
      sweetAlert("Bu dosya mevcuttur.!", "", "error");
    else if (this.articles.find(x => x.title == this.form.get('title').value))
      this.alertifyService.error("Aynı başlıkta dosya eklenemez.")
    else {
      this.fileService.uploadArticle(formData).subscribe(data => {
        if (data.status == 200 && data.response == 'success') {
          sweetAlert("Makale başarıyla eklendi!", "", "success");
          this.ngOnInit();
        }
      })
    }


  }

  getFileData() {
    this.fileService.getFiles().subscribe(data => {
      console.log(data.body);
      this.articles = data.body.length > 0 && data.status == 200 ? data.body : []
    })
  }


  deleteFile(className: string) {

    sweetAlert({
      title: "Makaleyi silmek istediginizden emin misin?",
      icon: "warning",
      buttons: ["Iptal", true],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.fileService.deleteFile(className).subscribe(data => {
            this.ngOnInit();
            sweetAlert("Makale silindi.!", {
              icon: "success",
            });
          })
        }
      });

  }

  logOut() {
    this.accountService.logOut();
    this.alertifyService.success("Başarıyla çıkış yaptınız...")
    setTimeout(() => {
      this.router.navigate(["blog"])
    }, 500);
  }


  edit(article) { //fonksiyona content ekle, html tarafında da ekle.
    // this.modalService.open(content);
    this.article = article
    this.updateForm.get('title').setValue(article.title);
    this.updateForm.get('explanation').setValue(article.explanation);
    this.updateForm.get('fileName').setValue(article.fileName.substring(0, article.fileName.indexOf('.')))
  }

  updateArticle() {
    this.newArticle.id = this.article.id
    this.newArticle.title = this.updateForm.get('title').value;
    this.newArticle.explanation = this.updateForm.get('explanation').value;
    this.newArticle.fileName = this.updateForm.get('fileName').value + '.pdf';

    if (this.articles.find(x => x.fileName == this.newArticle.fileName && x.id != this.newArticle.id))
      this.alertifyService.error("Bu dosya ismi mevcuttur.")
    else if (this.articles.find(x => x.title == this.newArticle.title && x.id != this.newArticle.id))
      this.alertifyService.error("Aynı başlık mevcuttur.")
    else {
      this.fileService.updateArticle(this.newArticle).subscribe(data => {
        if (data.success) {
          sweetAlert("Makale başarıyla güncellendi!", "", "success");
          this.alertifyService.success("updated..");
          $('#editModal').modal('hide')
          this.ngOnInit();
        }
        else
          this.alertifyService.error("error..")
      })
    }
  }

  changeFile(article) {
    this.article = article;
  }


  changeFileUpload() {
   
      if (this.articles.find(x => x.fileName == $('#newSelectedFile')[0].files[0].name && x.id != this.article.id))
        this.alertifyService.error("Bu dosya mevcuttur.")
      else {
        const formData = new FormData();
        formData.append('file', $('#newSelectedFile')[0].files[0]);
        this.fileService.changeFile(this.article.id, formData).subscribe(data => {
          if (data.response) {
            this.alertifyService.success("Dosya Degistirildi.");
            this.ngOnInit();
            $('#changeFileModal').modal('hide')
          }
          else
            this.alertifyService.error("Hata ! . Dosya degisirilemedi . " + data.err)
        })
      }

      

  }






}

