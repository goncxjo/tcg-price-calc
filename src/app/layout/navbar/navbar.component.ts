import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faCalculator, faGear, faHeart, faHome, faList, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { CardSearchModalComponent } from '../../components/cards/card-search-modal/card-search-modal.component';
import { SettingsComponent } from '../settings/settings.component';
import { LogoComponent } from '../logo/logo.component';
import { CommonModule } from '@angular/common';
import { AppThemeService } from '../../core/services/app-theme.service';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';
import { LoaderService } from '../../core';
import { DolarComponent } from '../dolar/dolar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LogoComponent, LoadingScreenComponent, DolarComponent, CommonModule, FontAwesomeModule, RouterLink, RouterLinkActive, NgbModalModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  homeIcon = faHome;
  calcIcon = faCalculator;
  listIcon = faList;
  searchIcon = faSearch;
  favIcon = faHeart;
  settingsIcon = faGear;
  menuIcon = faBars;

  public isMenuCollapsed = true;
  public appVersion: string = '';

  items: any[] = [
    { icon: this.homeIcon, command: () => { this.router.navigate(['/'])} },
    { icon: this.listIcon, command: () => { this.router.navigate(['/posts'])} },
    { icon: this.searchIcon, command: () => { this.openCardSearchModal() } },
    { icon: this.favIcon, command: () => {} },
    { icon: this.settingsIcon, command: () => { this.openSettingsOffcanvas() } },
  ];

  appThemeService: AppThemeService = inject(AppThemeService);
  loaderService: LoaderService = inject(LoaderService);

  constructor(
    private offcanvasService: NgbOffcanvas,
    private router: Router,
    private modalService: NgbModal,
  ) { }


  openCardSearchModal() {
    const modalRef = this.modalService.open(CardSearchModalComponent, {
      size: 'lg',
      scrollable: true,
      modalDialogClass: 'card-search-modal-height' 
    });

    modalRef.result.then(result => {
      if (result == "create") {
        this.router.navigate(['/posts/create']);
      }
    })
  }

	openSettingsOffcanvas() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
		this.offcanvasService.open(SettingsComponent, { position: 'end', panelClass: 'bg-primary text-bg-dark' }).result.then(
			(result) => {
        this.isMenuCollapsed = !this.isMenuCollapsed;
			},
			(reason) => {
			},
		);
	}
}
