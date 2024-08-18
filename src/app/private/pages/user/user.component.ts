import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatMenuModule } from '@angular/material/menu'
import { RouterLink } from '@angular/router'
import { DatePipe, NgIf } from '@angular/common'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTooltipModule } from '@angular/material/tooltip'
import { UserService } from '../../../services/user.service'
import { User, UserTable } from '../../../shared/types/user.types'

@Component({
  selector: 'app-user',
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
    DatePipe,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'email',
    'username',
    'role',
    'cpf',
    'createdAt',
    'action',
  ]
  dataSource: MatTableDataSource<UserTable, MatPaginator> =
    new MatTableDataSource<UserTable>([])
  @ViewChild(MatPaginator) paginator!: MatPaginator
  private userService = inject(UserService)

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    this.getUserList()
  }

  getUserList() {
    // @ts-ignore
    this.userService.getUserList().subscribe({
      next: (data) => {
        const dataSource: UserTable[] = data.map((user: User) => ({
          cpfCnpj: user.cpfCnpj,
          email: user.email,
          role: user.role,
          createdAt: new Date(user.createdAt),
          username: user.username,
          action: {
            view: 'visibility',
            delete: 'delete',
          },
        }))
        this.dataSource = new MatTableDataSource<UserTable>(dataSource)
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  // Search Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
