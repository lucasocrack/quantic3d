import { Component, OnInit, OnDestroy } from '@angular/core'
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor'
import { MatCardModule } from '@angular/material/card'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, MatCardModule, NgxEditorModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit, OnDestroy {
  editor!: Editor
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ]

  ngOnInit(): void {
    this.editor = new Editor()

    this.editor.valueChanges.subscribe((editor: unknown) => {
      console.log(editor)
    })
  }

  ngOnDestroy(): void {
    this.editor.destroy()
  }
}
