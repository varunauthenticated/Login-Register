import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientModel } from 'src/app/shared/client.model';
import { ClientService } from 'src/app/shared/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clientDetail: ClientModel[] = [];
  searchedClientDetail: ClientModel[] = [];
  private _searchDetailString: string;
  @ViewChild('searchDetail') searchDetail: ElementRef;

  get searchDetailString(): string {
    return this._searchDetailString;
  }
  set searchDetailString(value: string) {
    this._searchDetailString = value;
    this.searchedClientDetail = this.filterClientDetail(value);
  }

  filterClientDetail(searchString: string) {
    return this.clientDetail.filter(data =>
      data.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
      data.type.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
      data.subType.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
      data.freeTag.some(fdata => fdata.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
    );
  }

  constructor(
    private clientService: ClientService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getClientDetail();
  }

  getClientDetail() {
    this.clientDetail = this.clientService.getClient();
    this.searchedClientDetail = this.clientDetail;
  }

  onDelete(c_id: number) {
    if(confirm("Are you sure to delete this record?")){
      this.clientService.deleteClient(c_id);
      this.toastr.warning('Record Deleted', 'Status');
      this.searchDetail.nativeElement.value = "";
      this.getClientDetail()
    };
  }

  onEdit(c_id: number) {
    this.router.navigate(['/register', c_id]);
  }

}
