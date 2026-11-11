import {
  Component,
  OnInit,
  inject,
  signal,
  viewChild,
  ElementRef,
} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { API_BASE_URL } from '../../../../../core/config/api.config';
import { NotifyService } from '../../../../../core/notifications/notify.service';
import { AppModal } from '../../../../../shared/components/modal/modal';
import { convertImageToWebp } from '../../../application/convert-image-to-webp';

type MediaCategorie = 'photo' | 'document' | 'pdf';
type MediaSource = 'web' | 'local';

type RessourceItem = {
  id: string;
  nom: string;
  url: string;
  taille: number;
  typeFichier: string;
  categorie: MediaCategorie;
  createdAt: string;
  espaceId: string;
};

const ACCEPT_BY_CATEGORIE: Record<MediaCategorie, string> = {
  photo: 'image/jpeg,image/png,image/webp,image/gif',
  pdf: 'application/pdf',
  document:
    'text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation,video/mp4,audio/mpeg',
};

/** Ressources d'un espace : liste, recherche, ajout via modal (type / source / nom). */
@Component({
  selector: 'app-space-resources-page',
  imports: [
    ButtonModule,
    CardModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TableModule,
    AppModal,
  ],
  template: `
    <div class="au-page">
      <header class="au-page-head">
        <div>
          <h1 class="au-page-title">Ressources</h1>
          <p class="m-0 mt-1 text-sm text-muted-color">Les documents et contenus partagés avec les membres de cet espace.</p>
        </div>
        <div class="au-page-actions">
          <p-button
            label="Ajouter un média"
            icon="pi pi-plus"
            [loading]="uploading()"
            [disabled]="uploading()"
            (onClick)="openAddModal()"
          />
        </div>
      </header>

      <div class="au-filters" role="search">
        <p-iconfield class="au-search">
          <p-inputicon class="pi pi-search" />
          <input
            pInputText
            type="search"
            class="w-full"
            placeholder="Rechercher par nom, type ou catégorie"
            aria-label="Rechercher une ressource"
            [(ngModel)]="searchDraft"
            (ngModelChange)="onSearch($event)"
          />
        </p-iconfield>
      </div>

      <input
        #fileInput
        type="file"
        class="sr-only"
        [attr.accept]="acceptForCategorie()"
        (change)="onFileSelected($event)"
      />

      <app-modal
        [(visible)]="addDialogOpen"
        variant="brand"
        icon="pi pi-plus"
        title="Ajouter un média"
        description="Les photos sont converties en WebP dans le navigateur avant l'envoi."
        [busy]="uploading()"
        size="md"
      >
        <div class="grid gap-4">
          <fieldset class="grid gap-2 m-0 p-0 border-none">
            <legend class="text-sm font-medium mb-1">Type de média</legend>
            <div class="flex flex-wrap gap-3">
              @for (opt of categorieOptions; track opt.value) {
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="media-categorie"
                    [value]="opt.value"
                    [(ngModel)]="categorieDraft"
                    [disabled]="uploading()"
                  />
                  {{ opt.label }}
                </label>
              }
            </div>
          </fieldset>

          <fieldset class="grid gap-2 m-0 p-0 border-none">
            <legend class="text-sm font-medium mb-1">Source</legend>
            <div class="flex flex-wrap gap-3">
              @for (opt of sourceOptions; track opt.value) {
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="media-source"
                    [value]="opt.value"
                    [(ngModel)]="sourceDraft"
                    [disabled]="uploading()"
                  />
                  {{ opt.label }}
                </label>
              }
            </div>
          </fieldset>

          <div class="grid gap-1.5">
            <label for="media-nom" class="text-sm font-medium">Nom du média</label>
            <input
              pInputText
              id="media-nom"
              type="text"
              class="w-full"
              placeholder="Ex. Photo de couverture"
              [(ngModel)]="nomDraft"
              [disabled]="uploading()"
            />
          </div>

          @if (sourceDraft === 'web') {
            <div class="grid gap-1.5">
              <label for="media-url" class="text-sm font-medium">URL</label>
              <input
                pInputText
                id="media-url"
                type="url"
                class="w-full"
                placeholder="https://exemple.com/fichier"
                [(ngModel)]="sourceUrlDraft"
                [disabled]="uploading()"
              />
            </div>
          } @else {
            <div class="grid gap-1.5">
              <span class="text-sm font-medium">Fichier local</span>
              <div class="flex flex-wrap items-center gap-2">
                <p-button
                  label="Choisir un fichier"
                  icon="pi pi-folder-open"
                  severity="secondary"
                  [outlined]="true"
                  [disabled]="uploading()"
                  (onClick)="pickFile()"
                />
                <span class="text-sm text-muted-color">
                  {{ selectedFile()?.name || 'Aucun fichier sélectionné' }}
                </span>
              </div>
            </div>
          }
        </div>

        <ng-container modalFooter>
          <p-button
            label="Annuler"
            severity="secondary"
            [outlined]="true"
            [disabled]="uploading()"
            (onClick)="closeAddModal()"
          />
          <p-button
            label="Valider"
            icon="pi pi-check"
            [loading]="uploading()"
            (onClick)="submitAdd()"
          />
        </ng-container>
      </app-modal>

      <p-card class="au-flush" aria-label="Ressources de l'espace">
        @if (items().length === 0 && !loading()) {
        <div class="au-empty">
          <span class="au-empty-icon" aria-hidden="true"><i class="pi pi-folder-open"></i></span>
            <h2 class="au-empty-title">
              {{ search().trim() ? 'Aucun résultat' : 'Aucune ressource pour le moment' }}
            </h2>
            <p class="au-empty-text">
              {{
                search().trim()
                  ? 'Aucune ressource ne correspond à votre recherche.'
                  : 'Ajoutez un média depuis le web ou un dossier local.'
              }}
            </p>
            @if (!search().trim()) {
              <p-button
                label="Ajouter un média"
                icon="pi pi-plus"
                [outlined]="true"
                [loading]="uploading()"
                [disabled]="uploading()"
                (onClick)="openAddModal()"
              />
            }
        </div>
        } @else {
          <p-table [value]="items()" [loading]="loading()" [tableStyle]="{ 'min-width': '36rem' }">
            <ng-template #header>
              <tr>
                <th>Nom</th>
                <th>Type</th>
                <th>Taille</th>
              </tr>
            </ng-template>
            <ng-template #body let-item>
              <tr>
                <td>
                  <a class="text-primary font-medium" [href]="item.url" target="_blank" rel="noopener noreferrer">
                    {{ item.nom }}
                  </a>
                </td>
                <td class="text-muted-color">{{ labelCategorie(item.categorie) }}</td>
                <td class="au-num text-muted-color">{{ formatSize(item.taille) }}</td>
              </tr>
            </ng-template>
          </p-table>
        }
      </p-card>
    </div>
  `,
})
export class SpaceResourcesPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);
  private readonly notify = inject(NotifyService);
  private readonly fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');
  private searchTimer: ReturnType<typeof setTimeout> | undefined;

  readonly spaceId = this.route.snapshot.paramMap.get('spaceId') ?? '';
  readonly uploading = signal(false);
  readonly loading = signal(false);
  readonly items = signal<RessourceItem[]>([]);
  readonly search = signal('');
  readonly addDialogOpen = signal(false);
  readonly selectedFile = signal<File | null>(null);

  readonly categorieOptions = [
    { value: 'photo' as const, label: 'Photos' },
    { value: 'document' as const, label: 'Document' },
    { value: 'pdf' as const, label: 'PDF' },
  ];
  readonly sourceOptions = [
    { value: 'web' as const, label: 'Depuis le web' },
    { value: 'local' as const, label: 'Dossier local' },
  ];

  searchDraft = '';
  nomDraft = '';
  sourceUrlDraft = '';
  categorieDraft: MediaCategorie = 'photo';
  sourceDraft: MediaSource = 'local';

  acceptForCategorie(): string {
    return ACCEPT_BY_CATEGORIE[this.categorieDraft];
  }

  ngOnInit(): void {
    void this.load();
  }

  onSearch(value: string): void {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.search.set(value);
      void this.load();
    }, 300);
  }

  openAddModal(): void {
    this.nomDraft = '';
    this.sourceUrlDraft = '';
    this.categorieDraft = 'photo';
    this.sourceDraft = 'local';
    this.selectedFile.set(null);
    this.addDialogOpen.set(true);
  }

  closeAddModal(): void {
    this.addDialogOpen.set(false);
    this.selectedFile.set(null);
  }

  pickFile(): void {
    this.fileInput().nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    input.value = '';
    this.selectedFile.set(file);
  }

  async load(): Promise<void> {
    if (!this.spaceId) return;
    this.loading.set(true);
    try {
      let params = new HttpParams().set('espaceId', this.spaceId);
      const term = this.search().trim();
      if (term) params = params.set('search', term);
      const result = await firstValueFrom(
        this.http.get<{ items: RessourceItem[] }>(`${this.baseUrl}/mediatheque`, {
          params,
        }),
      );
      this.items.set(result.items ?? []);
    } catch (error) {
      this.notify.fromError(error, 'Impossible de charger les ressources');
      this.items.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  async submitAdd(): Promise<void> {
    if (!this.spaceId || this.uploading()) return;
    const nom = this.nomDraft.trim();
    if (!nom) {
      this.notify.warn('Indiquez le nom du média');
      return;
    }

    if (this.sourceDraft === 'web') {
      await this.importFromUrl(nom);
      return;
    }
    await this.importLocal(nom);
  }

  private async importFromUrl(nom: string): Promise<void> {
    const sourceUrl = this.sourceUrlDraft.trim();
    if (!sourceUrl) {
      this.notify.warn("Indiquez l'URL du média");
      return;
    }

    this.uploading.set(true);
    try {
      if (this.categorieDraft === 'photo') {
        const remote = await this.fetchRemoteImage(sourceUrl);
        const webp = await convertImageToWebp(remote, remote.name || 'image.webp');
        await this.postLocalFile(nom, webp);
      } else {
        await firstValueFrom(
          this.http.post(`${this.baseUrl}/mediatheque/import-url`, {
            nom,
            categorie: this.categorieDraft,
            sourceUrl,
            espaceId: this.spaceId,
          }),
        );
      }
      this.notify.success('Média importé');
      this.closeAddModal();
      await this.load();
    } catch (error) {
      this.notifyUploadError(error, "Impossible d'importer le média");
    } finally {
      this.uploading.set(false);
    }
  }

  private async importLocal(nom: string): Promise<void> {
    const file = this.selectedFile();
    if (!file) {
      this.notify.warn('Choisissez un fichier local');
      return;
    }

    this.uploading.set(true);
    try {
      const toUpload =
        this.categorieDraft === 'photo'
          ? await convertImageToWebp(file, file.name)
          : file;
      await this.postLocalFile(nom, toUpload);
      this.notify.success('Média ajouté', nom);
      this.closeAddModal();
      await this.load();
    } catch (error) {
      this.notifyUploadError(error, "Impossible d'ajouter le média");
    } finally {
      this.uploading.set(false);
    }
  }

  private notifyUploadError(error: unknown, summary: string): void {
    if (error instanceof Error && error.message && !('status' in error)) {
      this.notify.error(summary, error.message);
      return;
    }
    this.notify.fromError(error, summary);
  }

  private async postLocalFile(nom: string, file: File): Promise<void> {
    const contentBase64 = await this.readFileAsBase64(file);
    await firstValueFrom(
      this.http.post(`${this.baseUrl}/mediatheque/import-local`, {
        nom,
        categorie: this.categorieDraft,
        fileName: file.name,
        mimeType: file.type || 'application/octet-stream',
        contentBase64,
        espaceId: this.spaceId,
      }),
    );
  }

  private async fetchRemoteImage(sourceUrl: string): Promise<File> {
    let response: Response;
    try {
      response = await fetch(sourceUrl, { mode: 'cors', redirect: 'follow' });
    } catch {
      throw new Error(
        "Impossible de télécharger l'image (CORS). Importez-la depuis un dossier local.",
      );
    }
    if (!response.ok) {
      throw new Error(`Téléchargement impossible (HTTP ${response.status})`);
    }
    const blob = await response.blob();
    if (!blob.type.startsWith('image/')) {
      throw new Error("L'URL ne pointe pas vers une image");
    }
    const pathName = new URL(sourceUrl).pathname.split('/').pop() || 'image';
    return new File([blob], pathName, { type: blob.type });
  }

  private readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result ?? '');
        const base64 = result.includes(',') ? result.split(',')[1]! : result;
        resolve(base64);
      };
      reader.onerror = () => reject(reader.error ?? new Error('Lecture fichier impossible'));
      reader.readAsDataURL(file);
    });
  }

  labelCategorie(categorie: MediaCategorie): string {
    switch (categorie) {
      case 'photo':
        return 'Photo';
      case 'pdf':
        return 'PDF';
      default:
        return 'Document';
    }
  }

  formatSize(bytes: number): string {
    if (!Number.isFinite(bytes) || bytes < 0) return '—';
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  }
}
