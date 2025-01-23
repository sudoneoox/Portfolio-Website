export interface StyleConfig {
  navbar: string;
  container: string;
  wrapper: string;
  logo: string;
  menuContainer: string;
  menuItem: string;
  iconContainer: string;
  icon: string;
}
export enum ActiveItem {
  HOME,
  PLAYGROUND,
  ABOUT,
  PROJECTS,
}
export let currentlyActiveItem: ActiveItem = ActiveItem.HOME;

export interface MenuItem {
  name: string;
  activeItem?: ActiveItem;
  href?: string;
}

export interface BrandConfig {
  name: string;
}

export interface SocialIcon {
  name: string;
  href: string;
  icon: any;
}

export interface NavConfig {
  styles: StyleConfig;
  brand: BrandConfig;
  menuItems: MenuItem[];
  socialIcons: SocialIcon[];
}

export interface NavbarProps {
  config?: NavConfig;
}
