// import {
//   LayoutDashboard,
//   Users,
//   GraduationCap,
//   Receipt,
//   Video,
//   Code2,
//   Hexagon,
//   AppWindow,
//   FileQuestion,
//   Shapes,
//   LucideIcon,
// } from 'lucide-react';

import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

export const NavLinks = [
  {
    href: '/#tentang',
    key: 'Tentang',
    text: 'Tentang',
  },
  {
    href: '/#program',
    key: 'Program',
    text: 'Program',
  },
  {
    href: '/#footer',
    key: 'Kontak',
    text: 'Kontak',
  },
];

export const footerLinks = [
  {
    title: 'For developers',
    links: [
      'Go Pro!',
      'Explore development work',
      'Development blog',
      'Code podcast',
      'Open-source projects',
      'Refer a Friend',
      'Code of conduct',
    ],
  },
  {
    title: 'Hire developers',
    links: [
      'Post a job opening',
      'Post a freelance project',
      'Search for developers',
    ],
  },
  {
    title: 'Brands',
    links: ['Advertise with us'],
  },
  {
    title: 'Company',
    links: [
      'About',
      'Careers',
      'Support',
      'Media kit',
      'Testimonials',
      'API',
      'Terms of service',
      'Privacy policy',
      'Cookie policy',
    ],
  },
  {
    title: 'Directories',
    links: [
      'Development jobs',
      'Developers for hire',
      'Freelance developers for hire',
      'Tags',
      'Places',
    ],
  },
  {
    title: 'Development assets',
    links: [
      'Code Marketplace',
      'GitHub Marketplace',
      'NPM Registry',
      'Packagephobia',
    ],
  },
  {
    title: 'Development Resources',
    links: [
      'Freelancing',
      'Development Hiring',
      'Development Portfolio',
      'Development Education',
      'Creative Process',
      'Development Industry Trends',
    ],
  },
];

export const programs = [
  {
    id: 1,
    name: 'Web Programming',
    subtitle: 'For Age 15-17',
    description: 'Web (Beginner, Intermediate, Advanced)',
    imgUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi0.wp.com%2Fonlineseoking.com%2Fwp-content%2Fuploads%2F2020%2F08%2FWeb-Programming-1.jpg%3Ffit%3D768%252C580%26ssl%3D1&f=1&nofb=1&ipt=64e97b89bb418154967668f143060bf57cf84e2ecb7304f382cc1277f53436c4&ipo=images',
  },
  {
    id: 2,
    name: 'Mobile Programming',
    subtitle: 'For Age 13-16',
    description: 'MiT Inventor App',
    imgUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.qulix.com%2Fwp-content%2Fuploads%2F2020%2F05%2FArtboard-612101101.jpg&f=1&nofb=1&ipt=cbeae9b094030b03ec4511604b1114ca63283d8339c30010fa6ecccfb5e6b396&ipo=images',
  },
  {
    id: 3,
    name: 'Text Programming',
    subtitle: 'For Age 13-16',
    description: 'Text Programming (Roblox)',
    imgUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgamelevate.com%2Fwp-content%2Fuploads%2F2023%2F07%2FRoblox_-_Featured_Image.jpg&f=1&nofb=1&ipt=699128b6ef34850411f056aada4b5cbd91f48496049df6c49d611321ede955b0&ipo=images',
  },
  {
    id: 4,
    name: 'Visual Programming',
    subtitle: 'For Age 7-13',
    description: 'Visual Programming (Scratch)',
    imgUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmlyj654c2n0p.i.optimole.com%2Fr3qBotM-nKTTY9HB%2Fw%3Aauto%2Fh%3Aauto%2Fq%3Aauto%2Fhttp%3A%2F%2Fwww.drcodie.com%2Fwp-content%2Fuploads%2F2020%2F06%2Fscratch.jpg&f=1&nofb=1&ipt=413461b6757500f09b0601c3ee72dbaee58d35688032048f76560d9fc9ea4484&ipo=images',
  },
];

export const accordionQuestions = [
  {
    q: 'Apa yang membuat Lecturna berbeda dari kursus koding lainnya?',
    a: 'Lecturna mengajarkan konsep dasar koding melalui aktivitas yang menyenangkan seperti game, tantangan, proyek kreatif dan mengajarkan nilai-nilai karakter yang dapat diimplementasikan dalam kehidupan sehari-hari melalui pembelajaran coding.',
  },
  {
    q: 'Apakah kursus koding Lecturna cocok untuk anak-anak usia berapa?',
    a: 'Kursus koding Lecturna ditujukan untuk anak-anak usia 7 hingga 17 tahun, memberikan mereka keunggulan awal dalam proyek koding masa depan mereka.',
  },
  {
    q: 'Apa yang dijadikan fokus dalam kursus koding Lecturna?',
    a: 'Kursus koding Lecturna fokus pada pembuatan website, pengembangan aplikasi mobile, dan pengembangan game.',
  },
  {
    q: 'Apakah diperlukan pengetahuan koding sebelumnya untuk mengikuti kursus Lecturna?',
    a: 'Tidak, kursus koding Lecturna dirancang untuk semua tingkatan pemula. Kami menyediakan pembelajaran yang disesuaikan dengan level pemahaman anak-anak, sehingga tidak diperlukan pengetahuan koding sebelumnya.',
  },
];

export const testimonials = [
  {
    name: 'Budi Santoso',
    content:
      'Anak saya sangat antusias belajar koding dengan Lecturna. Mereka merasa senang dan semakin tertarik dalam mengembangkan kemampuan koding mereka.',
    rating: 5,
  },
  {
    name: 'Siti Rahayu',
    content:
      'Lecturna telah membantu anak saya memahami konsep-konsep koding dengan cara yang menyenangkan. Mereka kini memiliki dasar yang kuat untuk melanjutkan lebih jauh dalam dunia pemrograman.',
    rating: 4,
  },
  {
    name: 'Andi Pratama',
    content:
      'Saya sangat puas dengan kualitas pembelajaran yang diberikan oleh Lecturna. Anak saya merasa termotivasi dan meraih hasil yang positif dalam proyek-proyek koding yang mereka kerjakan.',
    rating: 5,
  },
  {
    name: 'Dewi Susanti',
    content:
      'Lecturna merupakan platform yang sangat ramah anak dan mudah digunakan. Anak saya merasa nyaman dan tidak merasa kesulitan saat mengikuti kursus koding di sini.',
    rating: 5,
  },
  {
    name: 'Rizki Pramudya',
    content:
      'Lecturna memberikan pengalaman belajar yang menyenangkan dan mendalam. Anak-anak kami semakin kreatif dan terampil dalam memecahkan masalah melalui koding.',
    rating: 4,
  },
  {
    name: 'Sinta Wijaya',
    content:
      'Lecturna adalah LMS yang sangat lengkap dan terpercaya. Anak-anak kami merasa terbantu dengan fitur-fitur interaktif dan bahan pembelajaran yang disajikan dengan jelas.',
    rating: 5,
  },
  {
    name: 'Anton Susanto',
    content:
      'Lecturna telah membantu anak saya mengembangkan minat dalam dunia pemrograman. Mereka merasa senang dan terus termotivasi untuk belajar lebih banyak.',
    rating: 5,
  },
  {
    name: 'Yulia Puspita',
    content:
      'Saya sangat mengapresiasi Lecturna atas kemampuannya dalam menjelaskan konsep-konsep koding dengan cara yang sederhana dan mudah dipahami oleh anak-anak.',
    rating: 4,
  },
  {
    name: 'Hendra Pratama',
    content:
      'Lecturna memberikan pengalaman pembelajaran yang sangat interaktif dan menarik. Anak-anak kami merasa senang dan semakin percaya diri dalam menerapkan apa yang mereka pelajari.',
    rating: 5,
  },
  {
    name: 'Rina Wulandari',
    content:
      'Lecturna telah menjadi pilihan yang tepat untuk mengenalkan anak kami pada dunia pemrograman. Mereka merasa tertantang dan terus mengembangkan keterampilan koding mereka.',
    rating: 5,
  },
];

// export const sidebarLinks = [
//   {
//     icon: LayoutDashboard,
//     route: '/',
//     label: 'Dashboard',
//   },
//   {
//     icon: HomeOutlinedIcon,
//     route: '/search',
//     label: 'Search',
//   },
//   {
//     icon: HomeOutlinedIcon,
//     route: '/activity',
//     label: 'Activity',
//   },
//   {
//     icon: HomeOutlinedIcon,
//     route: '/create-thread',
//     label: 'Create Thread',
//   },
//   {
//     icon: HomeOutlinedIcon,
//     route: '/communities',
//     label: 'Communities',
//   },
//   {
//     icon: HomeOutlinedIcon,
//     route: '/profile',
//     label: 'Profile',
//   },
// ];

export interface SidebarLink {
  title: string;
  content: {
    icon: keyof typeof dynamicIconImports;
    route: string;
    label: string;
  }[];
}

export const adminSideBarLinks: SidebarLink[] = [
  {
    title: '',
    content: [
      {
        icon: 'layout-dashboard',
        route: '/admin/dashboard',
        label: 'Dashboard',
      },
    ],
  },
  {
    title: 'Data',
    content: [
      {
        icon: 'users',
        route: '/admin/users',
        label: 'Users', // admin and instructor
      },
      {
        icon: 'graduation-cap',
        route: '/admin/students',
        label: 'Students',
      },
      {
        icon: 'receipt',
        route: '/admin/transactions',
        label: 'Transactions',
      },
    ],
  },
  {
    title: 'Content',
    content: [
      {
        icon: 'code-2',
        route: '/admin/create-course',
        label: 'Create Courses',
      },
      {
        icon: 'video',
        route: '/admin/live-courses',
        label: 'Live Courses',
      },
    ],
  },
  {
    title: 'Customization',
    content: [
      {
        icon: 'hexagon',
        route: '/admin/logo',
        label: 'Logo',
      },
      {
        icon: 'app-window',
        route: '/admin/hero',
        label: 'Hero',
      },
      {
        icon: 'file-question',
        route: '/admin/faq',
        label: 'FAQ',
      },
      {
        icon: 'shapes',
        route: '/admin/categories',
        label: 'Categories',
      },
    ],
  },
];