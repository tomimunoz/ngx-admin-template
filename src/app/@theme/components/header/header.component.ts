import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NB_WINDOW } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    // {
    //   value: 'cosmic',
    //   name: 'Cosmic',
    // },
    // {
    //   value: 'corporate',
    //   name: 'Corporate',
    // },
  ];

  currentTheme = localStorage.getItem('Theme');

  userMenu = [
    // { title: 'Profile' }, 
    { title: 'Log out'}];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    @Inject(NB_WINDOW) private window,
    public auth: AuthService,
    public afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    console.log(this.currentTheme)
    this.afAuth.authState.subscribe(e => {
      console.log(e.email)
    })

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => {
        this.afAuth.authState.subscribe(e => {
          console.log(e.email)
          if (e.email == 'admin@edenor.com') {
            this.user = users.admin
          }
        })
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName,
        localStorage.setItem('Theme', themeName)
      });

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'userMenu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        console.log(title)
        if (title == 'Log out') {
          this.auth.logout()
          
        } 
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    localStorage.setItem('Theme', themeName)
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
