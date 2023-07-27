import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DocumentService } from "src/app/services/document/document.service";
import { Document } from "src/app/services/document/document.model";

@Component({
  selector: "app-borrows",
  templateUrl: "./borrows.component.html",
  styleUrls: ["./borrows.component.scss"],
})
export class BorrowsComponent implements AfterViewInit {
  documents: Document[] = [];
  dataSource = new MatTableDataSource<Document>();
  documentTypeTranslations: { [key: string]: string };

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadDocumentList();
  }

  loadDocumentList(): void {
    this.documentService.getAllDocuments().subscribe({
      next: (documents: Document[]) => {
        this.documents = documents;
        this.dataSource.data = this.documents;
        this.dataSource.paginator = this.paginator;
        this.documentTypeTranslations =
          this.documentService.documentTypeTranslations;
      },
      error: (e) => console.error(e),
    });
  }

  displayedColumns: string[] = [
    "position",
    "document",
    "documentType",
    "status",
    "action",
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.loadDocumentList();
  }
}
