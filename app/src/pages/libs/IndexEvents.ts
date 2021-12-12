import { links } from './Config';

export class IndexEvents {
  private menuBtn = document.getElementById('menuBtn');
  private backdrop = document.getElementsByClassName('backdrop')[0];
  private sidebar = document.getElementsByClassName('sidebar')[0];
  private aboutBtn = document.getElementById('aboutBtn');
  private aboutPopover = document.getElementsByClassName('about-container')[0];
  private previewImage = document.getElementsByClassName('preview-img')[0];
  private headerBG = document.getElementsByClassName('header-bg')[0];
  private infoBtn = document.getElementById('infoBtn');

  private aboutSocialLinks = document.getElementsByClassName(
    'about-social__links'
  )[0].children;

  private backdropEventTarget: EventTarget | null = null;

  constructor() {
    this.headerEvents();
    this.backdropEvents();
    this.sidebarBtnEvents();
    this.aboutPopoverEvents();
    this.dispatchEvents();
  }

  private backdropEvents() {
    this.backdrop?.addEventListener('click', (event: Event) => {
      this.backdropEventTarget = event.target;
    });
  }

  private sidebarBtnEvents() {
    // this.menuBtn?.addEventListener('click', (event: Event) => {
    //   this.backdrop?.classList.add('backdrop--active');
    //   this.sidebar.classList.add('sidebar--active');
    // });
    this.infoBtn?.addEventListener('click', () => {
      // this.sidebar!.classList.remove('sidebar--active');
      this.backdrop?.classList.add('backdrop--active');
      this.aboutPopover.classList.add('about-container--active');
    });
  }

  private aboutPopoverEvents() {
    const linksParser = [
      links.social.github,
      links.social.gitkraken,
      links.social.linkedin,
      links.social.facebook,
      links.social.twitter,
    ];
    for (let i = 0; i < this.aboutSocialLinks.length; i++) {
      this.aboutSocialLinks[i].addEventListener('click', () => {
        window.open(linksParser[i]);
      });
    }
  }

  private headerEvents() {
    document.addEventListener('scroll', () => {
      const menuBtnHeight = this.menuBtn?.getBoundingClientRect().height;
      if (
        menuBtnHeight &&
        this.previewImage.getBoundingClientRect().top < menuBtnHeight
      ) {
        this.headerBG?.classList.add('header-bg--active');
      } else {
        this.headerBG.classList.remove('header-bg--active');
      }
    });
  }

  private dispatchEvents() {
    document.addEventListener('click', (event: Event) => {
      if (this.backdropEventTarget === event.target) {
        this.backdrop?.classList.remove('backdrop--active');
        this.sidebar!.classList.remove('sidebar--active');
        this.aboutPopover?.classList.remove('about-container--active');
      }
    });
  }
}
