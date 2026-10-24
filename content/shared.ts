/**
 * Общие для обеих языковых версий данные: фото, контакты, логотипы.
 * Меняются в одном месте и сразу применяются к русской и английской версии.
 */
import type { Logo, Photo, ServiceLogo } from "./types";

export const shared = {
  alias: "kalisdev",

  /**
   * ФОТО ПЕРВОГО ЭКРАНА: три кадра под разные ширины экрана.
   * Положите файлы в /public/photos/ и впишите пути, например
   * { src: "/photos/desktop.jpg" }. Браузер скачивает только тот кадр,
   * который подходит экрану.
   *
   * Если какого-то кадра нет, берётся ближайший из оставшихся.
   * Пока все три null, показывается заглушка с монограммой.
   *
   * position: какая точка кадра остаётся видимой при обрезке,
   * "по горизонтали по вертикали", по умолчанию "50% 30%".
   */
  photos: {
    /** Телефоны, экран уже 768 px. Вертикальный кадр 4:5, от 1200x1500 px. */
    mobile: null as Photo | null,
    /** Планшеты и небольшие ноутбуки, 768-1279 px. Кадр 3:2, от 2400x1600 px. */
    tablet: null as Photo | null,
    /** Ноутбуки и мониторы, от 1280 px. Широкий кадр 2:1, от 3200x1600 px. */
    desktop: null as Photo | null,
  },

  /**
   * АВАТАР в шапке сайта: маленькое круглое фото вместо монограммы.
   * Квадратный кадр от 400x400 px, лицо крупно и по центру.
   * Например: avatar: "/photos/avatar.jpg". Пока null, показывается монограмма.
   */
  avatar: null as string | null,

  contacts: {
    telegram: "kalisdev",
    github: "kalisdevt",
    email: "dimatynkovvv@yandex.ru",
    /** Телефон на публичной странице собирает спам. Впишите номер, если всё же нужен. */
    phone: null as string | null,
  },

  /** Логотипы мест работы. mono: перекрашивать в цвет текста. */
  logos: {
    magnit: { src: "/logos/magnit-tech.svg", width: 94, height: 32, mono: true } satisfies Logo,
    vypolnyator: { src: "/logos/vypolnyator.png", width: 40, height: 40 } satisfies Logo,
    repka: { src: "/logos/repka.png", width: 40, height: 40 } satisfies Logo,
  },

  /**
   * Логотипы сервисов для бегущей строки: одноцветные, файлы в /public/logos/services.
   * Файл работает как маска, поэтому важна только форма, цвет задаёт сайт.
   * width/height: пропорции файла; h: высота на странице в px (подбирается
   * на глаз, чтобы логотипы разной формы выглядели одного веса).
   */
  services: [
    { name: "amoCRM", src: "/logos/services/amocrm.svg", width: 83, height: 25, h: 24 },
    { name: "DaData", src: "/logos/services/dadata.svg", width: 500, height: 148, h: 30 },
    { name: "i-digital", src: "/logos/services/idigital.svg", width: 112, height: 69, h: 38 },
    { name: "TargetSMS", src: "/logos/services/targetsms.png", width: 330, height: 40, h: 22 },
    { name: "CloudKassir", src: "/logos/services/cloudkassir.svg", width: 208, height: 40, h: 30 },
    { name: "Jump.Finance", src: "/logos/services/jump.svg", width: 160, height: 34, h: 28 },
    { name: "Tochka", src: "/logos/services/tochka.svg", width: 1305, height: 172, h: 22 },
    { name: "T-Bank", src: "/logos/services/tbank.svg", width: 253, height: 74, h: 34 },
    { name: "Dolyami", src: "/logos/services/dolyame.svg", width: 322, height: 48, h: 24 },
    { name: "Yandex Pay", src: "/logos/services/yandexpay.svg", width: 96, height: 32, h: 30 },
    { name: "CloudPayments", src: "/logos/services/cloudpayments.svg", width: 187, height: 34, h: 30 },
  ] satisfies ServiceLogo[],

  /** Скриншоты проектов в /public/projects. */
  projectImages: {
    transport: { src: "/projects/transport-task.jpg", width: 1800, height: 1125 },
    landing: { src: "/projects/kalisdev-tech.jpg", width: 1800, height: 1125 },
  },
};
