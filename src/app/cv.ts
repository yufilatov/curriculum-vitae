export type Lang = "en" | "ru";

export type Role = {
  title: string;
  company: string;
  href: string;
  domain: string;
  dates: string;
  context: string;
  points: string[];
};

export type Study = {
  title: string;
  school: string;
  href: string;
  place: string;
  dates: string;
};

export type CvCopy = {
  name: string;
  role: string;
  focus: string;
  summary: string;
  email: string;
  phone: string;
  phoneHref: string;
  hint: string;
  print: string;
  sections: {
    experience: string;
    education: string;
    skills: string;
    languages: string;
  };
  roles: Role[];
  education: Study[];
  skills: { label: string; items: string }[];
  languages: { name: string; level: string }[];
};

const email = "yufilatov26@yandex.ru";
const phoneHref = "tel:+79313686855";

export const cv: Record<Lang, CvCopy> = {
  en: {
    name: "Yury Filatov",
    role: "Senior Frontend Developer",
    focus: "Angular  ·  TypeScript  ·  Design Systems",
    summary:
      "Senior frontend developer with seven years in Angular, from feature delivery through architecture, review, and release. Shipped a real-time sports microbetting web component, a shared UI library for international clients, and the public frontend of a federal environmental monitoring system. Comfortable planning with customers and partner engineers in English.",
    email,
    phone: "+7 931 368 68 55",
    phoneHref,
    hint: "Switch language, then print. The browser saves this page as an A4 PDF.",
    print: "Print / Save PDF",
    sections: {
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      languages: "Languages",
    },
    roles: [
      {
        title: "Senior Frontend Developer",
        company: "Bolshaya Troyka",
        href: "https://big3.ru/",
        domain: "big3.ru",
        dates: "Aug 2024 – Nov 2025",
        context:
          "The largest Russian software provider in ecology, building digital services for public and private companies.",
        points: [
          "Built the public frontend of FGIS Ecomonitoring, the federal environmental monitoring system, at ecomonitoring.mnr.gov.ru.",
          "Refactored the architecture, reduced technical debt, and improved performance.",
          "Owned code quality through review.",
        ],
      },
      {
        title: "Senior Frontend Developer",
        company: "Kero Sports",
        href: "https://kerosports.com/",
        domain: "kerosports.com",
        dates: "Nov 2023 – Aug 2024",
        context:
          "International platform for live betting and real-time microbetting.",
        points: [
          "Built, integrated, and supported a web component for real-time sports microbetting.",
          "Refactored the component architecture, reduced technical debt, and migrated the project to current Angular Elements.",
          "Improved performance and kept quality with code review and unit tests.",
          "Worked with partner engineering teams on integration, including in English.",
        ],
      },
      {
        title: "Software Engineer",
        company: "Arcadia / Software Country",
        href: "https://arcadia.spb.ru/",
        domain: "arcadia.spb.ru",
        dates: "Oct 2018 – Oct 2023",
        context:
          "Large outsourcing company for complex application development and big-data analytics.",
        points: [
          "Developed, integrated, and supported a graphics library for Labcorp, an international company in medical analysis and diagnostics.",
          "Built and maintained applications, modules, and components for Korn Ferry, an international management-consulting company.",
          "Refactored application architecture and a shared UI component library: reduced technical debt, migrated projects to current Angular versions, and improved performance.",
          "Held the quality bar with code review and unit tests.",
          "Joined planning and negotiations with the client directly, including in English.",
        ],
      },
    ],
    education: [
      {
        title: "Bachelor of Computer Science (Software Development)",
        school: "Multimedia University, Faculty of Informatics",
        href: "https://www.mmu.edu.my",
        place: "Cyberjaya, Malaysia",
        dates: "Sep 2012 – Mar 2018",
      },
      {
        title: "Exchange semester, Faculty of Informatics",
        school: "Technical University of Munich",
        href: "https://www.tum.de",
        place: "Munich, Germany",
        dates: "Sep 2015 – Mar 2016",
      },
      {
        title: "Exchange semester, Faculty of Economics",
        school: "Kanagawa University",
        href: "https://www.mgmt.kanagawa-u.ac.jp",
        place: "Yokohama, Japan",
        dates: "Mar 2018 – Aug 2018",
      },
    ],
    skills: [
      {
        label: "Angular",
        items: "Angular 5–20, Angular Elements, RxJS, NgRx, Nx",
      },
      {
        label: "Interface",
        items:
          "HTML, CSS, SCSS, LESS, PrimeNG, Angular Material, D3.js, Highcharts",
      },
      {
        label: "Platform",
        items: "TypeScript, JavaScript, Node.js",
      },
    ],
    languages: [
      { name: "Russian", level: "Native" },
      { name: "English", level: "C1" },
      { name: "German", level: "A2" },
      { name: "Kazakh", level: "A2" },
    ],
  },
  ru: {
    name: "Юрий Филатов",
    role: "Старший фронтенд-разработчик",
    focus: "Angular 5–20  ·  TypeScript  ·  дизайн-системы  ·  интерфейсы реального времени",
    summary:
      "Старший фронтенд-разработчик с семью годами опыта на Angular: от фич до архитектуры, ревью и релизов. Делал веб-компонент для спортивных микроставок в реальном времени, общую UI-библиотеку для международных заказчиков и публичную часть федеральной системы экологического мониторинга. Вёл планирование с заказчиками и инженерными командами партнёров на английском языке.",
    email,
    phone: "+7 931 368 68 55",
    phoneHref,
    hint: "Переключите язык и напечатайте страницу. Браузер сохранит её как PDF формата A4.",
    print: "Печать / PDF",
    sections: {
      experience: "Опыт",
      education: "Образование",
      skills: "Навыки",
      languages: "Языки",
    },
    roles: [
      {
        title: "Старший фронтенд-разработчик",
        company: "Большая Тройка",
        href: "https://big3.ru/",
        domain: "big3.ru",
        dates: "авг. 2024 – нояб. 2025",
        context:
          "Крупнейший отечественный поставщик программного обеспечения в сфере экологии. Цифровые сервисы для государственных и частных компаний.",
        points: [
          "Разработка публичной части федеральной государственной системы состояния окружающей среды ФГИС «Экомониторинг» (ecomonitoring.mnr.gov.ru).",
          "Рефакторинг и развитие архитектуры, снижение технического долга, оптимизация производительности.",
          "Контроль качества кода и код-ревью.",
        ],
      },
      {
        title: "Старший фронтенд-разработчик",
        company: "Kero Sports",
        href: "https://kerosports.com/",
        domain: "kerosports.com",
        dates: "нояб. 2023 – авг. 2024",
        context:
          "Международная платформа для лайв-ставок и микробетинга в реальном времени.",
        points: [
          "Разработка, интеграция и поддержка веб-компонента для спортивных микроставок в реальном времени.",
          "Рефакторинг архитектуры компонента, снижение технического долга и миграция на актуальные версии Angular Elements.",
          "Оптимизация производительности, код-ревью и покрытие unit-тестами.",
          "Переговоры с техническими командами партнёров по интеграции, в том числе на английском языке.",
        ],
      },
      {
        title: "Инженер-программист",
        company: "Аркадия / Software Country",
        href: "https://arcadia.spb.ru/",
        domain: "arcadia.spb.ru",
        dates: "окт. 2018 – окт. 2023",
        context:
          "Крупная аутсорсинговая компания: комплексная разработка приложений и аналитика больших данных.",
        points: [
          "Разработка, интеграция и поддержка графической библиотеки для Labcorp, международной компании в сфере медицинских анализов и диагностики.",
          "Разработка и поддержка приложений, модулей и компонентов для Korn Ferry, международной компании в сфере управленческого консалтинга.",
          "Рефакторинг архитектуры приложений и общей UI-библиотеки компонентов: снижение технического долга, миграция на актуальные версии Angular, оптимизация производительности.",
          "Контроль качества через код-ревью и покрытие unit-тестами.",
          "Переговоры и планирование с заказчиком напрямую, в том числе на английском языке.",
        ],
      },
    ],
    education: [
      {
        title: "Бакалавр компьютерных наук (разработка программного обеспечения)",
        school: "Университет Мультимедиа, факультет информатики",
        href: "https://www.mmu.edu.my",
        place: "Сайберджая, Малайзия",
        dates: "сент. 2012 – март 2018",
      },
      {
        title: "Семестр по обмену, факультет информатики",
        school: "Технический университет Мюнхена",
        href: "https://www.tum.de",
        place: "Мюнхен, Германия",
        dates: "сент. 2015 – март 2016",
      },
      {
        title: "Семестр по обмену, факультет экономики",
        school: "Университет Канагава",
        href: "https://www.mgmt.kanagawa-u.ac.jp",
        place: "Йокогама, Япония",
        dates: "март 2018 – авг. 2018",
      },
    ],
    skills: [
      {
        label: "Angular",
        items: "Angular 5–20, Angular Elements, RxJS, NgRx, Nx",
      },
      {
        label: "Интерфейс",
        items:
          "HTML, CSS, SCSS, LESS, PrimeNG, Angular Material, D3.js, Highcharts",
      },
      {
        label: "Платформа",
        items: "TypeScript, JavaScript, Node.js",
      },
    ],
    languages: [
      { name: "Русский", level: "родной" },
      { name: "Английский", level: "C1" },
      { name: "Немецкий", level: "A2" },
      { name: "Казахский", level: "A2" },
    ],
  },
};
