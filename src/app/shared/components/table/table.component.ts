import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { SelectionModel } from '@angular/cdk/collections'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatCardModule } from '@angular/material/card'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { RouterLink } from '@angular/router'
import { NgIf } from '@angular/common'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTooltipModule } from '@angular/material/tooltip'

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    NgIf,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'select',
    'customer',
    'email',
    'source',
    'status',
    'action',
  ]
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)
  selection = new SelectionModel<PeriodicElement>(true, [])

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length
    return numSelected === numRows
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear()
      return
    }
    this.selection.select(...this.dataSource.data)
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    customer: {
      img: 'images/users/user1.jpg',
      name: 'Carlos Daley',
    },
    email: 'carlos@default.com',
    source: 'Website',
    status: {
      new: 'New',
      // won: 'Won',
      // inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'images/users/user2.jpg',
      name: 'Dorothy Young',
    },
    email: 'dorothy@default.com',
    source: 'Referral',
    status: {
      // new: 'New',
      won: 'Won',
      // inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'images/users/user3.jpg',
      name: 'Greg Woody',
    },
    email: 'greg@default.com',
    source: 'Cold Call',
    status: {
      // new: 'New',
      // won: 'Won',
      inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'images/users/user4.jpg',
      name: 'Deborah Rosol',
    },
    email: 'deborah@default.com',
    source: 'Email Campaign',
    status: {
      // new: 'New',
      // won: 'Won',
      // inProgress: 'In Progress',
      lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'images/users/user5.jpg',
      name: 'Kendall Allen',
    },
    email: 'kendall@default.com',
    source: 'Online Store',
    status: {
      new: 'New',
      // won: 'Won',
      // inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'images/users/user6.jpg',
      name: 'Mark Stjohn',
    },
    email: 'mark@default.com',
    source: 'Online Store',
    status: {
      new: 'New',
      // won: 'Won',
      // inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'images/users/user7.jpg',
      name: 'Joan Stanley',
    },
    email: 'joan@default.com',
    source: 'Email Campaign',
    status: {
      new: 'New',
      // won: 'Won',
      // inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'images/users/user8.jpg',
      name: 'Jacob Bell',
    },
    email: 'jacob@default.com',
    source: 'Cold Call',
    status: {
      // new: 'New',
      won: 'Won',
      // inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'images/users/user9.jpg',
      name: 'Donald Bryan',
    },
    email: 'donald@default.com',
    source: 'Referral',
    status: {
      // new: 'New',
      won: 'Won',
      // inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'images/users/user10.jpg',
      name: 'Kristina Blomquist',
    },
    email: 'kristina@default.com',
    source: 'Website',
    status: {
      // new: 'New',
      // won: 'Won',
      // inProgress: 'In Progress',
      lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
]

export interface PeriodicElement {
  customer: {
    img: string
    name: string
  }
  email: string
  source: string
  status: {
    new?: string
    won?: string
    inProgress?: string
    lost?: string
  }
  action: {
    view?: string
    edit?: string
    delete?: string
  }
}
