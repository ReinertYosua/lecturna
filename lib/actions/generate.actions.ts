'use server';

import { faker } from '@faker-js/faker';
import { db } from '../db';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

export const generateCategories = async () => {
  try {
    await db.category.createMany({
      data: [
        {
          name: '7-13 Tahun',
        },
        {
          name: '13-16 Tahun',
        },
        {
          name: '15-17 Tahun',
        },
      ],
    });
  } catch (error: any) {
    throw new Error(`Failed to generate categories: ${error.message}`);
  }
};

export const generatePrograms = async () => {
  try {
    await db.program.createMany({
      data: [
        {
          name: 'Web Programming',
          subtitle1: 'For Age 15-17',
          subtitle2: 'Web (Beginner, Intermediate, Advanced)',
          description:
            'Terjunlah ke dunia menarik pengembangan web dengan program Pemrograman Web yang komprehensif kami. Baik Anda pemula, menengah, maupun mahir, program ini menawarkan kurikulum progresif yang memperlengkapi Anda dengan keterampilan untuk merancang dan mengembangkan situs web yang menakjubkan. Mulai dari HTML dan CSS hingga JavaScript dan kerangka kerja backend, temukan rahasia dari lanskap digital dan ungkapkan kreativitas Anda dalam dunia web yang terus berkembang. Daftar Sekarang.',
          image:
            'https://res.cloudinary.com/dgtch1ffs/image/upload/v1689776273/eezfvctdcefxczrikpzd.jpg',
          categoryId: '2aad5657-f62d-4413-96bc-51da78c0aa36',
          createdById: 'a1c09573-3b08-4a14-a822-9b17f824efa5',
        },
        {
          name: 'Mobile Programming',
          subtitle1: 'For Age 13-16',
          subtitle2: 'MiT Inventor App',
          description:
            'Mulailah perjalanan seru ke dunia pengembangan aplikasi seluler dengan program Pemrograman Mobile kami. Dengan menggunakan aplikasi MiT Inventor yang terkenal, Anda akan menemukan seni menciptakan aplikasi seluler yang inovatif dan menarik. Mulai dari merancang antarmuka pengguna hingga membuat fitur interaktif, program ini memberdayakan Anda untuk mewujudkan ide-ide Anda di dalam genggaman tangan. Temukan potensi teknologi seluler dan menjadi pendorong perubahan di era digital.',
          image:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.qulix.com%2Fwp-content%2Fuploads%2F2020%2F05%2FArtboard-612101101.jpg&f=1&nofb=1&ipt=cbeae9b094030b03ec4511604b1114ca63283d8339c30010fa6ecccfb5e6b396&ipo=images',
          categoryId: 'f62aaa9d-21b7-4783-bf0a-66eab2618067',
          createdById: 'a1c09573-3b08-4a14-a822-9b17f824efa5',
        },
        {
          name: 'Text Programming',
          subtitle1: 'For Age 13-16',
          subtitle2: 'Text Programming (Roblox)',
          description:
            'Masuki dunia pemrograman berbasis teks dengan program menarik kami, yang berpusat pada platform populer Roblox. Lepaskan imajinasi Anda dan bangun dunia maya yang mendalam, permainan interaktif, dan pengalaman menarik. Mulai dari mengkodekan mekanika dan menciptakan lingkungan yang dinamis hingga membuat skrip permainan yang rumit, program ini memberikan pondasi yang kokoh bagi para pengembang game dan para pencerita digital yang berbakat.',
          image:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgamelevate.com%2Fwp-content%2Fuploads%2F2023%2F07%2FRoblox_-_Featured_Image.jpg&f=1&nofb=1&ipt=699128b6ef34850411f056aada4b5cbd91f48496049df6c49d611321ede955b0&ipo=images',
          categoryId: 'f62aaa9d-21b7-4783-bf0a-66eab2618067',
          createdById: 'a1c09573-3b08-4a14-a822-9b17f824efa5',
        },
        {
          name: 'Visual Programming',
          subtitle1: 'For Age 7-13',
          subtitle2: 'Visual Programming (Scratch)',
          description:
            'Kenalkan anak-anak pada keajaiban pemrograman dengan program Pemrograman Visual kami, yang menampilkan platform terkenal bernama Scratch. Melalui antarmuka yang ramah pengguna dan intuitif, anak-anak akan belajar dasar-dasar pemrograman sambil membuat cerita interaktif, animasi, dan permainan. Mulai dari menarik dan menjatuhkan blok-blok kode hingga berpikir logis, program ini membangun keterampilan berpikir komputasional dan menyalakan semangat mereka dalam teknologi seumur hidup.',
          image:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmlyj654c2n0p.i.optimole.com%2Fr3qBotM-nKTTY9HB%2Fw%3Aauto%2Fh%3Aauto%2Fq%3Aauto%2Fhttp%3A%2F%2Fwww.drcodie.com%2Fwp-content%2Fuploads%2F2020%2F06%2Fscratch.jpg&f=1&nofb=1&ipt=413461b6757500f09b0601c3ee72dbaee58d35688032048f76560d9fc9ea4484&ipo=images',
          categoryId: '0b43ae8a-8a3e-4038-9b02-83a672a2614a',
          createdById: 'a1c09573-3b08-4a14-a822-9b17f824efa5',
        },
      ],
    });
  } catch (error: any) {
    throw new Error(`Failed to generate program data: ${error.message}`);
  }
};

export const generateTrialClassData = async () => {
  try {
    const data: Prisma.TrialClassRegistrationCreateInput[] = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        parentName: faker.person.fullName(),
        childName: faker.person.fullName(),
        address: faker.location.streetAddress(),
        ambition: faker.person.jobTitle(),
        birthPlace: faker.location.city(),
        childGender: Math.random() < 0.5 ? 'FEMALE' : 'MALE',
        dateOfBirth: faker.date.birthdate(),
        educationInstitution: faker.company.name(),
        email: faker.internet.email(),
        gradeClass: `${Math.floor(Math.random() * 12) + 1}`,
        hobby: faker.person.jobTitle(),
        phoneNumber: faker.phone.number(),
        trialClassDate: faker.date.future(),
      });
    }
    await db.trialClassRegistration.createMany({
      data,
    });
  } catch (error: any) {
    throw new Error(`Failed to generate trial class data: ${error.message}`);
  }
};

export const generateUser = async () => {
  try {
    const adminPassword = await bcrypt.hash('admin', 10);
    const instructorPassword = await bcrypt.hash('instructor', 10);
    const parentPassword = await bcrypt.hash('parent', 10);
    const studentPassword = await bcrypt.hash('student', 10);

    // await db.account.create({
    //   data: {
    //     email: 'admin@gmail.com',
    //     password: adminPassword,
    //     name: 'admin',
    //     phoneNumber: '123123',
    //     role: 'ADMIN',
    //     address: 'address123',
    //     username: 'admin',
    //     admin: {
    //       create: {},
    //     },
    //   },
    // });

    // await db.account.create({
    //   data: {
    //     email: 'instructor@gmail.com',
    //     password: instructorPassword,
    //     name: 'instructor',
    //     phoneNumber: '123456',
    //     role: 'INSTRUCTOR',
    //     address: 'address123',
    //     username: 'instructor',
    //     instructor: {
    //       create: {
    //         dateOfBirth: new Date('04-04-1990'),
    //         lastEducation: 'S1',
    //         educationInstitution: 'Binus',
    //         skills: {
    //           create: {
    //             name: 'Programming',
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    // await db.account.create({
    //   data: {
    //     email: 'parent@gmail.com',
    //     password: parentPassword,
    //     name: 'parent',
    //     phoneNumber: '123321',
    //     role: 'PARENT',
    //     address: 'address123',
    //     username: 'parent',
    //     parent: {
    //       create: {},
    //     },
    //   },
    // });

    await db.account.create({
      data: {
        email: 'student@gmail.com',
        password: studentPassword,
        name: 'student',
        phoneNumber: '0901221',
        role: 'STUDENT',
        address: 'address123',
        username: 'student',
      },
    });
  } catch (error: any) {
    console.log(error.message);
    throw new Error(`Failed to generate user: ${error.message}`);
  }
};
