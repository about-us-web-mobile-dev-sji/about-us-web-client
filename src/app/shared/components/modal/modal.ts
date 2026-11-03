import { Component, computed, input, model } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

/**
 * Variantes du modal : seule la pastille d'icône change, le modal reste blanc.
 * - `neutral` : le cas courant ; pastille contour (blanche, filet).
 * - `brand` : une action de création ou d'invitation ; pastille bleue.
 * - `danger` : une action destructrice ; pastille rouge, action principale en `severity="danger"`.
 * - `spotlight` : un succès ou une annonce courte ; icône et titre centrés.
 */
export type ModalVariant = 'neutral' | 'brand' | 'spotlight' | 'danger';
export type ModalSize = 'sm' | 'md' | 'lg';

const WIDTHS: Record<ModalSize, string> = { sm: '22rem', md: '26rem', lg: '36rem' };

/**
 * Modal du thème, construit sur `p-dialog` (focus piégé, Échap, fond cliquable, mobile plein écran).
 *
 * ```html
 * <app-modal [(visible)]="open" variant="brand" icon="pi pi-user-plus" title="Inviter un membre" description="…">
 *   …contenu…
 *   <ng-container modalFooter>
 *     <p-button label="Annuler" severity="secondary" [text]="true" (onClick)="open.set(false)" />
 *     <p-button label="Envoyer" (onClick)="send()" />
 *   </ng-container>
 * </app-modal>
 * ```
 */
@Component({
  selector: 'app-modal',
  imports: [DialogModule],
  template: `
    <p-dialog
      [visible]="visible()"
      (visibleChange)="onVisibleChange($event)"
      [modal]="true"
      [draggable]="false"
      [resizable]="false"
      [dismissableMask]="!busy()"
      [closeOnEscape]="!busy()"
      [closable]="!busy()"
      [blockScroll]="true"
      [styleClass]="styleClass()"
      [style]="{ width: width() }"
      [breakpoints]="{ '640px': 'calc(100vw - 1.5rem)' }"
      closeAriaLabel="Fermer"
      appendTo="body"
    >
      <ng-template #header>
        <div class="au-modal-head">
          @if (icon()) {
            <span class="au-modal-icon" aria-hidden="true"><i [class]="icon()"></i></span>
          }
          <div class="au-modal-heading">
            <h2 class="au-modal-title">{{ title() }}</h2>
            @if (description()) {
              <p class="au-modal-description">{{ description() }}</p>
            }
          </div>
        </div>
      </ng-template>

      <ng-content />

      <ng-template #footer>
        <ng-content select="[modalFooter]" />
      </ng-template>
    </p-dialog>
  `,
})
export class AppModal {
  readonly visible = model(false);
  readonly title = input.required<string>();
  readonly description = input<string>();
  /** Classe PrimeIcons, ex. `pi pi-user-plus`. */
  readonly icon = input<string>();
  readonly variant = input<ModalVariant>('neutral');
  readonly size = input<ModalSize>('md');
  /** Une action est en cours : le modal ne peut pas être fermé. */
  readonly busy = input(false);

  readonly width = computed(() => WIDTHS[this.size()]);
  readonly styleClass = computed(() => `au-modal au-modal--${this.variant()}`);

  onVisibleChange(visible: boolean): void {
    if (!visible && this.busy()) return;
    this.visible.set(visible);
  }
}
