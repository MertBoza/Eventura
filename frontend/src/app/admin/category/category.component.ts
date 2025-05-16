import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, CategoryService } from '../../views/services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  categories = signal<Category[]>([]);
  error = signal<string | null>(null);
  editingId: number | null = null;

  formCategory = signal<{ name: string }>({ name: '' });

  constructor(private categoryService: CategoryService) {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (cats) => this.categories.set(cats),
      error: (err) =>
        this.error.set(err.message || 'Failed to load categories'),
    });
  }

  saveCategory() {
    this.error.set(null);

    if (this.editingId) {
      this.categoryService
        .updateCategory(this.editingId, this.formCategory())
        .subscribe({
          next: () => {
            this.loadCategories();
            this.cancelEdit();
          },
          error: (err) =>
            this.error.set(err.message || 'Failed to update category'),
        });
    } else {
      this.categoryService.createCategory(this.formCategory()).subscribe({
        next: () => {
          this.loadCategories();
          this.cancelEdit();
        },
        error: (err) =>
          this.error.set(err.message || 'Failed to create category'),
      });
    }
  }

  editCategory(category: Category) {
    this.editingId = category.id;
    this.formCategory.set({ name: category.name });
  }

  cancelEdit() {
    this.editingId = null;
    this.formCategory.set({ name: '' });
  }

  deleteCategory(id: number) {
    if (!confirm('Are you sure you want to delete this category?')) return;

    this.categoryService.deleteCategory(id).subscribe({
      next: () => this.loadCategories(),
      error: (err) =>
        this.error.set(err.message || 'Failed to delete category'),
    });
  }
}
