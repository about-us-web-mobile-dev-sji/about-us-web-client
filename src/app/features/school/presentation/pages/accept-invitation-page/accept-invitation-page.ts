import { Component, inject, signal, type OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SchoolMembershipFacade } from '../../../application/school-membership.facade';
import { AppError, errorCodeOf } from '../../../../../core/errors/app-error';
import { errorMessage } from '../../../../../core/i18n/error-messages';

type State =
  | { kind: 'pending' }
  | { kind: 'accepted'; schoolName: string }
  | { kind: 'failed'; message: string };

/**
 * UC-16. Target of the invitation link. The route guard sends a visitor
 * without session to the login page (Google), which brings them back here;
 * the invitation is then accepted without any further action.
 */
@Component({
  selector: 'app-accept-invitation-page',
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-3xl p-8">
      <h1 class="mb-4 text-3xl font-semibold" i18n="@@invitation.title">Invitation</h1>
      @switch (state().kind) {
        @case ('pending') {
          <p role="status" i18n="@@invitation.pending">Acceptation de l’invitation…</p>
        }
        @case ('accepted') {
          <p role="status" class="mb-6" i18n="@@invitation.accepted">
            Bienvenue ! Tu as rejoint « {{ schoolName() }} ».
          </p>
          <a routerLink="/home" class="text-blue-700 underline" i18n="@@invitation.home">
            Aller à l’accueil
          </a>
        }
        @case ('failed') {
          <p role="alert" class="mb-6">{{ failure() }}</p>
          <a routerLink="/home" class="text-blue-700 underline" i18n="@@invitation.home">
            Aller à l’accueil
          </a>
        }
      }
    </section>
  `,
})
export class AcceptInvitationPage implements OnInit {
  private readonly memberships = inject(SchoolMembershipFacade);
  private readonly query = inject(ActivatedRoute).snapshot.queryParamMap;
  readonly state = signal<State>({ kind: 'pending' });

  schoolName(): string {
    const state = this.state();
    return state.kind === 'accepted' ? state.schoolName : '';
  }

  failure(): string {
    const state = this.state();
    return state.kind === 'failed' ? state.message : '';
  }

  async ngOnInit(): Promise<void> {
    const schoolId = this.query.get('schoolId');
    const token = this.query.get('token');
    try {
      if (!schoolId || !token) throw new AppError('SCHOOL_INVITATION_INVALID', 400);
      const accepted = await this.memberships.acceptInvitation(schoolId, token);
      this.state.set({ kind: 'accepted', schoolName: accepted.schoolName });
    } catch (error) {
      this.state.set({ kind: 'failed', message: errorMessage(errorCodeOf(error)) });
    }
  }
}
