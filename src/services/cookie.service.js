import Cookies from "universal-cookie";

class CookiesService {
  cookies;

  constructor() {
    this.cookies = new Cookies();
  }

  get(key) {
    return this.cookies.get(key);
  }

  set(key, value) {
    this.cookies.set(key, value, { maxAge: 30 * 24 * 60 * 60 });
  }

  remove(key) {
    this.cookies.remove(key);
  }
}

export const cookiesService = new CookiesService();
